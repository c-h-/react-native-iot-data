import React, { Component, PropTypes } from 'react';

// get inspiration from
// https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web
// https://github.com/virgilvox/curie-web-ble/blob/master/main.js
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
    
  }

  /**
   * Cleans up event hooks
   */
  componentWillUnmount() {
  }

  /**
   * Scans BLE peripherals in range
   */
  scan = ({ ...args }) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Connects to a BLE peripheral
   */
  connect = (peripheral_id) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Disconnects from a connected BLE peripheral
   */
  disconnect = (peripheral_id) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Retrieve services for a connected peripheral
   */
  retrieveServices = (peripheral_id) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  /**
   * Retrieve services for a connected peripheral
   */
  startNotifications = ({ ...args }) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  render() {
    return this.props.children || null;
  }
}

export default BLEManager;
