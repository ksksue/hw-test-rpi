const serial = require('./index');

serial.on('receive', (json) => {
  console.log(json);
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
}, 1000);

