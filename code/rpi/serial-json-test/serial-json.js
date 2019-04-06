const SerialPort = require('serialport')

const DEVICE_PATH = '/dev/ttyUSB0';
const SERIAL_OPTION = { baudRate: 115200 };

const port = new SerialPort(DEVICE_PATH, SERIAL_OPTION);

// \nをデリミタとしてデータ受信
const parser = new SerialPort.parsers.Readline({ delimiter: '\n' });
port.pipe(parser);

// データ受信
parser.on('data', (data) => {
  try {
    var json = JSON.parse(data);
    console.log(`recv : ${json.relay_status}`);
  } catch(e) {
    console.error(e.message);
  }
});

port.on('open', () => {
  console.log('Open');
});

port.on('close', (err) => {
  console.log('Close');
});

port.on('error', (err) => {
  console.log(err);
});

var state = 0;
var jsonObj = {};

// 1秒毎に relay:on と relay:off を交互に送る
setInterval(() => {
  // データ送信
  if(state === 0) {
    jsonObj.relay = 'on';
    state = 1;
  } else {
    jsonObj.relay = 'off';
    state = 0;
  }
  port.write(`${JSON.stringify(jsonObj)}\n`);
  console.log(`send : ${JSON.stringify(jsonObj)}`);
}, 1000);

