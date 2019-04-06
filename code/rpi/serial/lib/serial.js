'use strict';
var SerialPort = require('serialport');
var util = require('util');
var events = require('events');
var debug = require('debug')('serial');

const REOPEN_DELAY_MS = 1000;

function serial(devicePath, serialOption) {
  if(!(this instanceof serial)) {
    return new serial(devicePath, serialOption);
  }

  this._isOpen = false;

  console.log(serialOption);
  this._p = new SerialPort(devicePath, serialOption, (err) => {
    if (err) {
      this._reopen();
      this.emit('error', err);
    }
  });

  // parse delimiter \n
  this._port = new SerialPort.parsers.Readline();
  this._p.pipe(this._port);

  this._reopen = () => {
    if(!this._isOpen) {
      debug('Try REOPEN');
      this._port.open((err) => {
        debug('Done REOPEN ', err);
        setTimeout(this._reopen, REOPEN_DELAY_MS);
      });
    }
  }

  this._p.on('open', (err) => {
    this._isOpen = true;
    debug('OPEN ', err);
    this.emit('open', err);
  });

  this._p.on('close', (err) => {
    this._isOpen = false;
    debug('CLOSE ', err);
    this.emit('close', err);
    this._reopen();
  });

  this._port.on('data', (data) => {
    debug('data ', data);
    this.emit('receive', data);
  });

  this._port.on('error', (err) => {
    debug('ERROR ', err);
    this.emit('error', err);
  });
}

util.inherits(serial, events.EventEmitter);

serial.prototype.send = function(text, callback) {
  this._port.write(text, function(err) {
    debug('send ', text);
    if(callback) {
      callback(err);
    }
  });
};

module.exports = serial;

