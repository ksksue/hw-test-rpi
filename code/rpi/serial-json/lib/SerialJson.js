'use strict';
const SerialPort = require('serialport');
const util = require('util');
const events = require('events');
const debug = require('debug')('SerialJson');

const REOPEN_DELAY_MS = 1000;
const SERIAL_DELIMITER = '\n';

function SerialJson(devicePath, serialOption) {
  if(!(this instanceof SerialJson)) {
    return new SerialJson(devicePath, serialOption);
  }

  this._isOpen = false;

  this._reopen = () => {
    if(!this._isOpen) {
      debug('Try REOPEN');
      this._port.open((err) => {
        debug('Done REOPEN ', err);
        setTimeout(this._reopen, REOPEN_DELAY_MS);
      });
    }
  }

  this._parser = new SerialPort.parsers.Readline({ delimiter: SERIAL_DELIMITER });

  this._port = new SerialPort(devicePath, serialOption, (err) => {
    if (err) {
      this._reopen();
      this.emit('error', err);
      return;
    }

    this._port.pipe(this._parser);
  });

  this._port.on('open', (err) => {
    this._isOpen = true;
    debug('OPEN ', err);
    this.emit('open', err);
  });

  this._port.on('close', (err) => {
    this._isOpen = false;
    debug('CLOSE ', err);
    this.emit('close', err);
    this._reopen();
  });

  this._parser.on('data', (data) => {
    debug('data ', data);
    try {
      var json = JSON.parse(data);
      this.emit('receive', json);
      return;
    } catch(e) {
    }

    try {
      var json = eval('(' + data + ')');
      this.emit('receive', json);
    } catch(e) {
      this.emit('error', e);
    }

  });

  this._port.on('error', (err) => {
    debug('ERROR ', err);
    this.emit('error', err);
  });
}

util.inherits(SerialJson, events.EventEmitter);

SerialJson.prototype.send = function(json, callback) {
  var text = JSON.stringify(json) + '\n';
  this._port.write(text, function(err) {
    debug('send ', text);
    if(callback) {
      callback(err);
    }
  });
};

module.exports = SerialJson;

