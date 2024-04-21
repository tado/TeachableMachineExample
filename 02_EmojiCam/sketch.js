// 学習してアップロードしたモデルのURL
// !!ここに自分のモデルのURLを入力!!
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/UCMSny7yP/';

let classifier;
let video;
let flippedVideo;

// 現在の分類結果を格納する配列
let currentResults = [];

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  textSize(200);
  textAlign(CENTER, CENTER);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  background(0);
  noStroke();
  image(flippedVideo, 0, 0);
  //もし分類結果があれば、それに応じた絵文字を表示
  if (currentResults.length > 0) {
    switch (currentResults[0].label) {
      case 'normal':
        text('😐', width / 2, height / 2);
        break;
      case 'sad':
        text('😔', width / 2, height / 2);
        break;
      case 'smile':
        text('😊', width / 2, height / 2);
        break;
    }
  }
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  currentResults = results;
  classifyVideo();
}