const serial = require('./serial')('/dev/ttyUSB0', { baudRate: 115200 });

serial.on('receive', (d) => { 
  console.log(d);
});

setInterval(() => {
  serial.send('echo back\n');
}, 1000);

