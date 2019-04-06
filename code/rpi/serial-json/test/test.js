const DEVICE_PATH = '/dev/ttyUSB0';
const SERIAL_OPTIONS = { baudRate: 115200 };
const serial = require('../index')(DEVICE_PATH, SERIAL_OPTIONS);

serial.on('receive', (json) => {
  console.log(`receive : ${JSON.stringify(json)}`);
});

var json = {relay: 'on'};
var state = 0;

// 1秒毎に relay:on と relay:off を交互に送る
setInterval(() => {
  // データ送信
  if(state === 0) {
    json.relay = 'on';
    serial.send(json);
    state = 1;
  } else {
    json.relay = 'off';
    serial.send(json);
    state = 0;
  }
  console.log(`send : ${JSON.stringify(json)}`);
}, 1000);

