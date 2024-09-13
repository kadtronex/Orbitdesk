let device;
let server;
let service;
let characteristic;

// Connect to ESP32
async function connectToESP32() {
  try {
    console.log('Requesting Bluetooth Device...');
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['19b10000-e8f2-537e-4f6c-d104768a1214'] }]
    });

    console.log('Connecting to GATT Server...');
    server = await device.gatt.connect();

    console.log('Getting Service...');
    service = await server.getPrimaryService('19b10000-e8f2-537e-4f6c-d104768a1214');

    console.log('Getting Characteristic...');
    characteristic = await service.getCharacteristic('19b10002-e8f2-537e-4f6c-d104768a1214');

    document.getElementById('connectionStatus').innerText = 'Connected to ESP32';
  } catch (error) {
    console.log('Connection failed', error);
    document.getElementById('connectionStatus').innerText = 'Connection failed';
  }
}

// Add event listener to the "Connect to OrbitDesk" button
document.getElementById('connectButton').addEventListener('click', connectToESP32);
