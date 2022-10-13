// Feature Extractor Classification
// Adapted from The Coding Train by Daniel Shiffman https://editor.p5js.org/codingtrain/sketches/5A_TJHA1
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
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  classifier.classify(gotResults);
}

function videoReady() {
  // A callback just to let us know that the video is ready
  console.log('Video is ready!!!');
  classifier.load('./model/model.json', customModelReady); // Loading in the model. Place model.json in same folder as sketch.js
}

function whileTraining(loss) {
  // Runs during training process and reports back the loss in the console
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults); // When training is complete asking it to classify the results
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

  happyButton = createButton('happy'); // Creating a button for Happy
  happyButton.mousePressed(function () {
    // Basically this is saying when a button is pressed run this function. The function adds the image captured with the label happy
    classifier.addImage('happy');
  });

  sadButton = createButton('sad');
  sadButton.mousePressed(function () {
    classifier.addImage('sad');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });

  saveButton = createButton('save');
  saveButton.mousePressed(function () {
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
