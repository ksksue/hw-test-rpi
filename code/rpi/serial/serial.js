const SerialPort = require('serialport')

const DEVICE_PATH = '/dev/ttyUSB0';
const SERIAL_OPTIONS = { baudRate: 115200 };

const port = new SerialPort(DEVICE_PATH, SERIAL_OPTIONS);

// \nをデリミタとしてデータ受信
const parser = new SerialPort.parsers.Readline({ delimiter: '\n' });
port.pipe(parser);

// データ受信
parser.on('data', (data) => {
  console.log(`recv : ${data}`);
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

// 1秒毎にo(ON)とf(OFF)を交互に送る
setInterval(() => {
  // データ送信
  if(state === 0) {
    port.write('o\n');
    console.log('send : o');
    state = 1;
  } else {
    port.write('f\n');
    console.log('send : f');
    state = 0;
  }
}, 1000);

