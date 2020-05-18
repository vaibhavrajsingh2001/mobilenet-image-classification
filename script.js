let net;
const webcamElement = document.getElementById('webcam');
const consoleElem = document.getElementById('console');

(async () => {
    console.log('Loading mobilenet..');
    consoleElem.innerText = 'Please wait while the model is being loaded!'

    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');

    const webcam = await tf.data.webcam(webcamElement);

    while (true) {
        const img = await webcam.capture();
        const result = await net.classify(img);

        document.getElementById('console').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability * 100} %
    `;
        // Dispose the tensor to release the memory.
        img.dispose();
    }

})();