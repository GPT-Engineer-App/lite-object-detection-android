import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

let model;

onmessage = async (e) => {
  try {
    if (e.data === 'loadModel') {
      model = await cocoSsd.load({ backend: 'webgl' });
      postMessage('modelLoaded');
    } else {
      if (!model) {
        throw new Error('Model not loaded');
      }
      const { imageData, roi } = e.data;
      const predictions = await model.detect(imageData, { maxNumBoxes: 10, minScore: 0.5 });
      const filteredPredictions = predictions.filter(prediction => 
        ['bottle', 'can', 'cardboard', 'glass bottle'].includes(prediction.class)
      );
      postMessage(filteredPredictions);
    }
  } catch (error) {
    postMessage({ error: error.message });
  }
};