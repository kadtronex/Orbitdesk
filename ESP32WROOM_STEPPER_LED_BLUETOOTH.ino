#include <BluetoothSerial.h>
#include <Stepper.h>

// Bluetooth Serial object
BluetoothSerial SerialBT;

// Stepper motor settings
#define STEPS_PER_REV 2048  // 28BYJ-48 motor typically has 2048 steps per revolution
Stepper stepper(STEPS_PER_REV, 14, 12, 13, 15);  // IN1, IN2, IN3, IN4 pins

// LED settings
const int ledPin = 27;

// Variables for continuous movement
bool continuousForward = false;
bool continuousBackward = false;

void setup() {
    Serial.begin(115200);

    // Start Bluetooth Serial
    SerialBT.begin("OrbitDisk"); // Name of your Bluetooth device
    Serial.println("Bluetooth device is ready to pair!");

    // Initialize stepper motor and LED
    stepper.setSpeed(10);  // Set speed in RPM
    pinMode(ledPin, OUTPUT);
    digitalWrite(ledPin, LOW);
}

void loop() {
    // Check for Bluetooth commands
    if (SerialBT.available()) {
        String command = SerialBT.readString();
        command.trim();  // Remove any leading/trailing whitespace

        Serial.print("Received command: ");
        Serial.println(command);

        // Command to step forward one revolution
        if (command.equalsIgnoreCase("STFW")) {
            continuousForward = false;  // Stop continuous movement if it's running
            continuousBackward = false;
            stepper.step(STEPS_PER_REV);  // Move forward one revolution
            SerialBT.println("Stepper moving forward 1 rev");
        } 
        // Command to step backward one revolution
        else if (command.equalsIgnoreCase("STBW")) {
            continuousForward = false;
            continuousBackward = false;
            stepper.step(-STEPS_PER_REV);  // Move backward one revolution
            SerialBT.println("Stepper moving backward 1 rev");
        }
        // Command to start continuous forward rotation
        else if (command.equalsIgnoreCase("STFCO")) {
            continuousForward = true;
            continuousBackward = false;
            SerialBT.println("Stepper continuous forward started");
        }
        // Command to start continuous backward rotation
        else if (command.equalsIgnoreCase("STRCO")) {
            continuousForward = false;
            continuousBackward = true;
            SerialBT.println("Stepper continuous backward started");
        }
        // Command to stop continuous movement
        else if (command.equalsIgnoreCase("STOP")) {
            continuousForward = false;
            continuousBackward = false;
            SerialBT.println("Stepper stopped");
        }
        // Command to turn LED on
        else if (command.equalsIgnoreCase("LDON")) {
            digitalWrite(ledPin, HIGH);  // Turn LED on
            SerialBT.println("LED is ON");
        } 
        // Command to turn LED off
        else if (command.equalsIgnoreCase("LDOF")) {
            digitalWrite(ledPin, LOW);  // Turn LED off
            SerialBT.println("LED is OFF");
        } 
        else {
            SerialBT.println("Invalid command.");
        }
    }

    // Handle continuous forward movement
    if (continuousForward) {
        stepper.step(STEPS_PER_REV);  // Keep moving forward by 1 revolution
    }
    // Handle continuous backward movement
    if (continuousBackward) {
        stepper.step(-STEPS_PER_REV);  // Keep moving backward by 1 revolution
    }
}
