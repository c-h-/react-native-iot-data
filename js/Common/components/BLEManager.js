import React, { Component, PropTypes } from 'react';
import {
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,

  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import bleParser from 'ble-packet-parser';

// const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManager);

export default class BLEManager extends Component {
  static propTypes = {
    children: PropTypes.any,
  }
  state = {
    scanning: false,
    peripherals: new Map(),
    data: [],
  }

  componentDidMount() {
    BleManager.start({
      showAlert: false,
      allowDuplicates: false,
    });

    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan
    );
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectedPeripheral
    );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
      .then((result) => {
        if (result) {
          console.log('Permission is OK');
        }
        else {
          PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
          ).then((result2) => {
            if (result2) {
              console.log('User accept');
            }
            else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.update();
  }

  handleDisconnectedPeripheral = (data) => {
    const peripherals = this.state.peripherals;
    const peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals });
    }
    console.log(`Disconnected from ${data.peripheral}`);
  }

  handleUpdateValueForCharacteristic = (data) => {
    console.log(`Received data from ${data.peripheral} characteristic ${data.characteristic} ${data.value} ${Math.round(data.value[0] * data.value[1]) - 32768}`);
  }

  handleStopScan = () => {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan = () => {
    if (!this.state.scanning) {
      BleManager.scan([], 3, true).then((/* results */) => {
        console.log('Scanning...');
        this.setState({ scanning: true });
      });
    }
  }

  handleDiscoverPeripheral = (peripheral) => {
    const peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)) {
      console.log('Got ble peripheral', peripheral);
      if (peripheral.advertising) {
        console.log('packet contents:', bleParser(peripheral.advertising.bytes, true));
      }
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals });
      if (peripheral.name === 'IMUBLESketch3') {
        // HAVE ARDUINO PACKET
        BleManager.connect(peripheral.id)
          .then(() => {
            const disconnect = () => {
              BleManager.disconnect(peripheral.id)
                .then(() => {
                  console.log('Disconnected');
                })
                .catch((error) => {
                  console.log(`Disconnect error ${error}`);
                });
            };
            console.log(`Connected to ${peripheral.name}`);
            BleManager.retrieveServices(peripheral.id)
              .then((info) => {
                console.log('Periph Info', info);
                if (info && info.characteristics) {
                  // heart beat service
                  const txcs = info.characteristics.filter(characteristic => characteristic.service === '19B10000-E8F2-537E-4F6C-D104768A1216'.toLowerCase());
                  const chars = [
                    '5667f3b1-d6a2-4fb2-a917-4bee580a9c84',
                    '5667f3b1-d6a2-4fb2-a917-4bee580a9c85',
                    '5667f3b1-d6a2-4fb2-a917-4bee580a9c86',
                    '5667f3b1-d6a2-4fb2-a917-4bee580a9c87',
                    '5667f3b1-d6a2-4fb2-a917-4bee580a9c88',
                    '5667f3b1-d6a2-4fb2-a917-4bee580a9c89',
                  ];
                  const toSubscribe = [];
                  const finish = () => {
                    setTimeout(() => {
                      disconnect();
                    }, 10000);
                  };
                  txcs.forEach((tx) => {
                    if (chars.includes(tx.characteristic)) {
                      toSubscribe.push([peripheral.id, tx.service, tx.characteristic]);
                    }
                  });
                  if (toSubscribe.length) {
                    console.log('started subscribe loop');
                    const next = () => {
                      if (toSubscribe.length) {
                        const tx = toSubscribe.pop();
                        BleManager.startNotification(...tx)
                          .then(() => {
                            console.log(`Subscription started to ${tx.service} ${tx.characteristic}`);
                            next();
                          })
                          .catch((error) => {
                            console.log('Subscription error', error);
                            next();
                          });
                      }
                      else {
                        finish();
                      }
                    };
                    next();
                  }
                  else {
                    disconnect();
                  }
                }
                else {
                  disconnect();
                }
              });
          })
          .catch((error) => {
            console.error('Connection error', error);
          });
      }
    }
  }

  _renderPeripherals = () => {
    const {
      peripherals,
    } = this.state;
    const toRender = [];
    peripherals.forEach((value, key) => {
      if (typeof key === 'string') {
        toRender.push(
          <View key={key}> {/* key is not an array index, it's a map index */}
            <Text>{key}</Text>
            <Text>{JSON.stringify(value)}</Text>
          </View>
        );
      }
    });
    return toRender;
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => this.startScan()}>
          <Text style={{ margin: 10, padding: 15, color: 'blue' }}>
            Start Scan
          </Text>
        </TouchableHighlight>
        {/* <Text>Current peripherals:</Text>
        <View>
          {this._renderPeripherals()}
        </View>
        <View>
          {this.props.children}
        </View> */}
      </View>
    );
  }
}
