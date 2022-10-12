// Feature Extractor Classification
// A Beginner's Guide to Machine Learning with ml5.js
// The Coding Train / Daniel Shiffman
// https://youtu.be/eeO-rWYFuG0
// https://thecodingtrain.com/learning/ml5/3.1-feature-extractor-classification.html
// https://editor.p5js.org/codingtrain/sketches/5A_TJHA1

// (This sketch is not working in safari)

let mobilenet;
let classifier;
let video;
let label = 'test';
let ukeButton;
let whistleButton;
let trainButton;



function modelReady() { 
  console.log('Model is ready!!!'); // Tells us when the model is loaded and ready to be used
  
  // classifier.load('model.json', customModelReady) // Loading in the model 
}

function videoReady() { // A callback just to let us know that the video is ready 
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // updated to work with newer version of ml5
    // label = result;
    label = result[0].label;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady); // Extracting the pre-learned features from MobileNet model
  classifier = mobilenet.classification(video, videoReady); // Making a classification object from the feature extractor 

  happyButton = createButton('happy');
  happyButton.mousePressed(function() {
    classifier.addImage('happy');
  });

  sadButton = createButton('sad');
  sadButton.mousePressed(function() {
    classifier.addImage('sad');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });

  saveButton = createButton('save');
  saveButton.mousePressed(function() {
    classifier.save();
  });
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}
