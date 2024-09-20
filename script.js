// Function to send a request to control the stepper motor
function rotateStepper(direction) {
  let url = `/stepper?direction=${direction}`;
  fetch(url)
      .then(response => response.text())
      .then(data => {
          alert(`Stepper Motor: ${data}`);
      })
      .catch(error => console.log('Error:', error));
}

// Function to send a request to control the LED
function toggleLED(state) {
  let url = `/led?state=${state}`;
  fetch(url)
      .then(response => response.text())
      .then(data => {
          alert(`LED is now: ${data}`);
      })
      .catch(error => console.log('Error:', error));
}
