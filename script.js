const esp32Ip = "http://192.168.3.14";  // Replace with your ESP32's IP address

// Function to send a request to control the stepper motor
function rotateStepper(direction) {
    let url = `${esp32Ip}/stepper?direction=${direction}`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
            alert(`Stepper Motor: ${data}`);
        })
        .catch(error => {
            alert('Error: Could not reach the ESP32');
            console.log('Error:', error);
        });
}

// Function to send a request to control the LED
function toggleLED(state) {
    let url = `${esp32Ip}/led?state=${state}`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
            alert(`LED is now: ${data}`);
        })
        .catch(error => {
            alert('Error: Could not reach the ESP32');
            console.log('Error:', error);
        });
}
