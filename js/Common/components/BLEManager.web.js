import React, { Component, PropTypes } from 'react';

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
    return this.props.children;
  }
}

export default BLEManager;
