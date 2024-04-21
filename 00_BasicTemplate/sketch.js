/* ===
Teachable Machine + p5.js + ml5 サンプルコード
事前にTeachable Machineで訓練されたカスタマイズモデルと
p5.js + ml5.jsを使ったウェブカメラ画像の分類。
=== */

// 学習してアップロードしたモデルのURL
// !!ここに自分のモデルのURLを入力!!
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/8dyZwOgL4/';

// Classifier変数
let classifier;
// ビデオ
let video;
let flippedVideo;
// 分類結果のラベルを格納
let label = "";

// モデルをプリロード
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 500);
  // ビデオを設定
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  flippedVideo = ml5.flipImage(video);
  // 分類処理を開始
  classifyVideo();
}

function draw() {
  background(0);
  // ビデオを描画
  image(flippedVideo, 0, 0);
  // 分類結果のラベルを描画
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// 現在のビデオ画像からラベルを予測
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// 分類結果を取得
function gotResult(error, results) {
  // エラー処理
  if (error) {
    console.error(error);
    return;
  }

  // 結果をコンソールに表示
  console.log(results[0]);
  
  // 分類結果のラベルを取得
  label = results[0].label;
  // 再度分類処理を行う
  classifyVideo();
}