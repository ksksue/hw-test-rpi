const SerialPort = require('serialport')

const DEVICE_PATH = '/dev/ttyUSB0';
const SERIAL_OPTION = { baudRate: 115200 };

const port = new SerialPort(DEVICE_PATH, SERIAL_OPTION);

// \nをデリミタとしてデータ受信
const parser = new SerialPort.parsers.Readline({ delimiter: '\n' });
port.pipe(parser);

// データ受信
parser.on('data', (data) => {
  console.log(data);
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

// 1秒毎にoとfを交互に送る
setInterval(() => {
  // データ送信
  if(state === 0) {
    port.write('o\n');
    state = 1;
  } else {
    port.write('f\n');
    state = 0;
  }
}, 1000);

