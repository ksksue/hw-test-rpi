#include <ArduinoJson.h>

#define RELAY_PIN_NUM     (4)
#define RELAY_PIN_INIT()  pinMode(RELAY_PIN_NUM, OUTPUT);
#define RELAY_ON()        digitalWrite(RELAY_PIN_NUM, HIGH)
#define RELAY_OFF()       digitalWrite(RELAY_PIN_NUM, LOW)

#define IS_DELIMITER(x)   (x == '\n')

String recvString = "";

void setup() {
  Serial.begin(115200);
  while (!Serial) continue;

  RELAY_PIN_INIT();
}

void loop() {
  static bool relay_on = false;

  while (Serial.available()) {
    char c = (char)Serial.read();
    recvString += c;
    if(IS_DELIMITER(c)) {
      StaticJsonDocument<256> doc;
      DeserializationError error = deserializeJson(doc, recvString.c_str());
      recvString = "";

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

      relay_on = doc["relay"];

      ////////////////////
    }
  }

  if(relay_on) {
    RELAY_ON();
    Serial.println("{ 'state': true }");
  } else {
    RELAY_OFF();
    Serial.println("{ 'state': false }");
  }
}
