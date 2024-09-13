let device;
let server;
let characteristic;

async function connectToOrbitDesk() {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ name: 'OrbitDesk-BLE' }],
      optionalServices: ['19b10000-e8f2-537e-4f6c-d104768a1214']
    });

    server = await device.gatt.connect();
    const service = await server.getPrimaryService('19b10000-e8f2-537e-4f6c-d104768a1214');
    characteristic = await service.getCharacteristic('19b10001-e8f2-537e-4f6c-d104768a1214');

    document.getElementById('status').textContent = 'Status: Connected';
  } catch (error) {
    console.error('Connection failed', error);
    document.getElementById('status').textContent = 'Status: Connection Failed';
  }
}

function navigateToMain() {
  window.location.href = 'main.html';
}

document.getElementById('connect-btn').addEventListener('click', connectToOrbitDesk);

// main.html functionalities

async function rotateMotor() {
  if (characteristic) {
    await characteristic.writeValue(new TextEncoder().encode('rotate'));
    document.getElementById('motor-status').textContent = 'Motor Status: ON';
  }
}

async function stopMotor() {
  if (characteristic) {
    await characteristic.writeValue(new TextEncoder().encode('stop'));
    document.getElementById('motor-status').textContent = 'Motor Status: OFF';
  }
}

document.getElementById('rotate-btn').addEventListener('click', rotateMotor);
document.getElementById('stop-btn').addEventListener('click', stopMotor);

// Camera functionality (basic example)
document.getElementById('camera-btn').addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.createElement('video');
  document.body.appendChild(video);
  video.srcObject = stream;
  video.play();
});

document.getElementById('disconnect-btn').addEventListener('click', () => {
  if (server) {
    server.disconnect();
  }
  window.location.href = 'index.html';
