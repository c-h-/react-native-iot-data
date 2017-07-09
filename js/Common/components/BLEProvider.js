import React, { Component, PropTypes } from 'react';
import {
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,

  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import BLEManager from 'Common/components/BLEManager';

const BLESketchName = 'IMUBLESketch4';
const BLEService = '19B10000-E8F2-537E-4F6C-D104768A1217';
const chars = [
  '5667f3b1-d6a2-4fb2-a917-4bee580a9c84', // ax
  '5667f3b1-d6a2-4fb2-a917-4bee580a9c85', // ay
  '5667f3b1-d6a2-4fb2-a917-4bee580a9c86', // az
  '5667f3b1-d6a2-4fb2-a917-4bee580a9c87', // gx
  '5667f3b1-d6a2-4fb2-a917-4bee580a9c88', // gy
  '5667f3b1-d6a2-4fb2-a917-4bee580a9c89', // gz
  '5667f3b1-d6a2-4fb2-a917-4bee580a9c90', // vi
  '5667f3b1-d6a2-4fb2-a917-4bee580a9c91', // so
];
const datapoints = [
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '90',
  '91',
];
const datapointLabels = [
  'ax',
  'ay',
  'az',
  'gx',
  'gy',
  'gz',
  'vi',
  'so',
];

export default class BLEProvider extends Component {
  static data = [] // used as a cache of reads
  static dataOwners = [] // store ownership info separate from data
  static propTypes = {
    children: PropTypes.any,
  }
  state = {
    scanning: false,
    peripherals: new Map(),
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
    // console.log(`Received data from ${data.peripheral} characteristic ${data.characteristic} ${data.value} ${Math.round(data.value[0] * data.value[1]) - 32768}`);

    // Math.round(data.value[0] * data.value[1]) - 32768 is formula for uncompressed value
    BLEProvider.data.push([
      datapoints.indexOf(data.characteristic.slice(-2)),
      data.value[0],
      data.value[1],
    ]);
    BLEProvider.dataOwners.push([
      data.peripheral,
      data.service,
      data.characteristic,
    ]);
  }

  handleStopScan = () => {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan = () => {
    if (!this.state.scanning && this.manager) {
      this.manager.scan([], 3, true).then((/* results */) => {
        console.log('Scanning...');
        this.setState({ scanning: true });
      });
    }
  }

  handleDiscoverPeripheral = (peripheral) => {
    const peripherals = this.state.peripherals;
    if (this.manager) {
      if (!peripherals.has(peripheral.id)) {
        console.log('Got ble peripheral', peripheral);
        if (peripheral.advertising) {
          // console.log('packet contents:', bleParser(peripheral.advertising.bytes, true));
        }
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
        if (peripheral.name === BLESketchName) {
          // HAVE ARDUINO PACKET
          this.manager.connect(peripheral.id)
            .then(() => {
              const disconnect = () => {
                this.manager.disconnect(peripheral.id)
                  .then(() => {
                    console.log('Disconnected');
                  })
                  .catch((error) => {
                    console.log(`Disconnect error ${error}`);
                  });
              };
              console.log(`Connected to ${peripheral.name}`);
              this.manager.retrieveServices(peripheral.id)
                .then((info) => {
                  console.log('Periph Info', info);
                  if (info && info.characteristics) {
                    // heart beat service
                    const txcs = info.characteristics.filter(characteristic => characteristic.service === BLEService.toLowerCase());
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
                          this.manager.startNotification(...tx)
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
                      console.log('Disconnecting because of ')
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
    else {
      console.error('No manager ref found!');
    }
  }

  render() {
    return (
      <View>
        <BLEManager
          ref={ref => (this.manager = ref)}
          discoveredPeripheral={this.handleDiscoverPeripheral}
          stoppedScan={this.handleStopScan}
          disconnectedPeripheral={this.handleDisconnectedPeripheral}
          updatedValue={this.handleUpdateValueForCharacteristic}
        />
        {/* <TouchableHighlight onPress={() => this.startScan()}>
          <Text style={{ margin: 10, padding: 15, color: 'blue' }}>
            Start Scan
          </Text>
        </TouchableHighlight>
        <View>
          <Text>Measurements recorded:</Text>
          <Text>{BLEProvider.data.length}</Text>
          {
            datapointLabels.map((label, i) => {
              return (
                <View>
                  { /* Gets the number of measurements for each data label / }
                  <Text>{label}</Text>
                  <Text>{BLEProvider.data.filter(point => point[0] === i)}</Text>
                </View>
              );
            })
          }
        </View> */}
        {this.props.children}
      </View>
    );
  }
}
