#define SERIAL_BAUDRATE 115200
#define SERIAL_DELIMITER '\n'

#define RELAY_PIN_NUM     (4)
#define RELAY_PIN_INIT()  pinMode(RELAY_PIN_NUM, OUTPUT);
#define RELAY_ON()        digitalWrite(RELAY_PIN_NUM, HIGH)
#define RELAY_OFF()       digitalWrite(RELAY_PIN_NUM, LOW)

String inputString = "";
boolean stringComplete = false;

void setup() {
  Serial.begin(SERIAL_BAUDRATE);
  inputString.reserve(200);

  RELAY_PIN_INIT();
}

void loop() {

  if (stringComplete) {

    // シリアル受信完了時にここにくる
    if(inputString.charAt(0) == 'o') {
      RELAY_ON();
      Serial.println("relay on");
    } else if(inputString.charAt(0) == 'f') {
      RELAY_OFF();
      Serial.println("relay off");      
    }

    inputString = "";
    stringComplete = false;
  }

  delay(10);
}

// シリアル通信受信イベント
void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    inputString += inChar;
    if (inChar == SERIAL_DELIMITER) {
      stringComplete = true;
    }
  }
}

