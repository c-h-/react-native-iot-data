import React, { Component, PropTypes } from 'react';
import {
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import NativeBleManager from 'react-native-ble-manager';
// import bleParser from 'ble-packet-parser';

const bleManagerEmitter = new NativeEventEmitter(NativeBleManager);

class BLEManager extends Component {
  static propTypes = {
    children: PropTypes.any,
    discoveredPeripheral: PropTypes.function,
    stoppedScan: PropTypes.function,
    disconnectedPeripheral: PropTypes.function,
    updatedValue: PropTypes.function,
  }

  /**
   * Attach event hooks, get permission access
   */
  componentDidMount() {
    const {
      discoveredPeripheral,
      stoppedScan,
      disconnectedPeripheral,
      updatedValue,
    } = this.props;
    NativeBleManager.start({
      showAlert: false,
      allowDuplicates: false,
    });

    this.handlerDiscover = bleManagerEmitter.addListener(
      'NativeBleManagerDiscoverPeripheral',
      discoveredPeripheral
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'NativeBleManagerStopScan',
      stoppedScan
    );
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'NativeBleManagerDisconnectPeripheral',
      disconnectedPeripheral
    );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'NativeBleManagerDidUpdateValueForCharacteristic',
      updatedValue
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

  /**
   * Cleans up event hooks
   */
  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.update();
  }

  /**
   * Scans BLE peripherals in range
   */
  scan = ({ ...args }) => {
    return new Promise((resolve, reject) => {
      const toPass = args.length ? args : [[], 3, true];
      NativeBleManager.scan(...toPass)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Connects to a BLE peripheral
   */
  connect = (peripheral_id) => {
    return new Promise((resolve, reject) => {
      NativeBleManager.connect(peripheral_id)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Disconnects from a connected BLE peripheral
   */
  disconnect = (peripheral_id) => {
    return new Promise((resolve, reject) => {
      NativeBleManager.disconnect(peripheral_id)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Retrieve services for a connected peripheral
   */
  retrieveServices = (peripheral_id) => {
    return new Promise((resolve, reject) => {
      NativeBleManager.retrieveServices(peripheral_id)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Retrieve services for a connected peripheral
   */
  startNotifications = ({ ...args }) => {
    return new Promise((resolve, reject) => {
      NativeBleManager.startNotifications(...(args || []))
        .then(resolve)
        .catch(reject);
    });
  }

  render() {
    return this.props.children || null;
  }
}

export default BLEManager;
