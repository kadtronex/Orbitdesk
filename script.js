let device;
let motorCharacteristic;
let ledCharacteristic;

document.getElementById('connectButton').addEventListener('click', async () => {
  try {
    device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['4fafc201-1fb5-459e-8fcc-c5c9c331914b'] }]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('4fafc201-1fb5-459e-8fcc-c5c9c331914b');
    motorCharacteristic = await service.getCharacteristic('beb5483e-36e1-4688-b7f5-ea07361b26a8');
    ledCharacteristic = await service.getCharacteristic('fe97d501-b0de-46be-a7db-a68f0eb9e9e7');

    document.getElementById('connectionStatus').innerText = 'Status: Connected';
  } catch (error) {
    console.log(error);
    document.getElementById('connectionStatus').innerText = 'Status: Failed to Connect';
  }
});

document.getElementById('rotateButton').addEventListener('click', async () => {
  await motorCharacteristic.writeValue(new TextEncoder().encode('rotate'));
  document.getElementById('motorStatus').innerText = 'Motor Status: On';
});

document.getElementById('stopButton').addEventListener('click', async () => {
  await motorCharacteristic.writeValue(new TextEncoder().encode('stop'));
  document.getElementById('motorStatus').innerText = 'Motor Status: Off';
});

document.getElementById('disconnectButton').addEventListener('click', async () => {
  if (device && device.gatt.connected) {
    await device.gatt.disconnect();
    document.getElementById('connectionStatus').innerText = 'Status: Disconnected';
  }
});
