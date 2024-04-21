// 学習してアップロードしたモデルのURL
// !!ここに自分のモデルのURLを入力!!
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/8dyZwOgL4/';

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
  textSize(14);
  textAlign(RIGHT, TOP);
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
  fill(0, 127);
  rect(40, 20, 200, currentResults.length * 20 + 15);

  // 全ての分類結果のラベル(文字列)と信頼度(0.0 - 1.0)を表示
  for (let i = 0; i < currentResults.length; i++) {
    fill(255);
    text(currentResults[i].label + ':', 120, 20 * i + 30);
    fill(127);
    rect(130, 20 * i + 30, 100, 10);
    fill(31, 127, 255);
    rect(130, 20 * i + 30, currentResults[i].confidence * 100, 10);
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