let net;
const webcamElement = document.getElementById('webcam');

(async () => {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');

    const webcam = await tf.data.webcam(webcamElement);
    document.getElementById('btn').addEventListener('click', () => predict());

    async function predict () {
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

