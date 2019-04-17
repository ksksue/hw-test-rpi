#include <ArduinoJson.h>

#define SERIAL_BAUDRATE 115200
#define SERIAL_DELIMITER '\n'

#define RELAY_PIN_NUM     (4)
#define RELAY_PIN_INIT()  pinMode(RELAY_PIN_NUM, OUTPUT);
#define RELAY_ON()        digitalWrite(RELAY_PIN_NUM, HIGH)
#define RELAY_OFF()       digitalWrite(RELAY_PIN_NUM, LOW)

String inputString = "";
boolean stringComplete = false;

String relay_status;

void setup() {
  Serial.begin(SERIAL_BAUDRATE);
  inputString.reserve(200);

  RELAY_PIN_INIT();
}

void loop() {

  if (stringComplete) {

    // シリアル受信完了時にここにくる
    // いったんこのサンプルではrelayの状態をJSON形式でエコーバック
    if(relay_status.compareTo("on") == 0) {
      RELAY_ON();
      Serial.println("{ \"relay_status\": \"on\" }");
    } else if(relay_status.compareTo("off") == 0) {
      RELAY_OFF();
      Serial.println("{ \"relay_status\": \"off\" }");
    }

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
      StaticJsonDocument<256> doc;
      DeserializationError error = deserializeJson(doc, inputString.c_str());
      inputString = "";

      // when error, return json error messages
      if (error) {
        Serial.print("{ 'error': '");
        Serial.print(error.c_str());
        Serial.println("' }");
        break;
      }

      ////////////////////
      // json parser
      ////////////////////

      relay_status = doc["relay"].as<String>();

      ////////////////////

      stringComplete = true;
    }
  }
}

