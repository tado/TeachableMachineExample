/* ===
Teachable Machine + p5.js + ml5 サンプルコード
事前にTeachable Machineで訓練されたカスタマイズモデルと
p5.js + ml5.jsを使ったウェブカメラ画像の分類。
分類結果をグラフで表示
=== */

// 学習してアップロードしたモデルのURL
// !!ここに自分のモデルのURLを入力!!
let imageModelURL = "https://teachablemachine.withgoogle.com/models/8dyZwOgL4/";

// クラス分類器の変数
let classifier;
// ビデオ
let video;
// クラス分類の結果を保存するための変数
let label = "";
// 現在の分類結果を格納する配列
let currentResults = [];

// 最初にモデルを読み込む
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json", {
    flipped: true,
  });
}

function setup() {
  createCanvas(640, 500);
  textSize(14);
  textAlign(RIGHT, TOP);
  // ビデオを作成
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  classifier.classifyStart(video, gotResult);
}

function draw() {
  background(0);
  // ビデオを描画
  image(video, 0, 0);

  //枠を表示
  noStroke();
  fill(0, 127);
  rect(40, 20, 200, currentResults.length * 20 + 15);

  // 全ての分類結果のラベル(文字列)と信頼度(0.0 - 1.0)を表示
  for (let i = 0; i < currentResults.length; i++) {
    fill(255);
    text(currentResults[i].label + ":", 120, 20 * i + 30);
    fill(127);
    rect(130, 20 * i + 30, 100, 10);
    fill(31, 127, 255);
    rect(130, 20 * i + 30, currentResults[i].confidence * 100, 10);
  }
}

// 現在のビデオフレームを分類する
function classifyVideo() {
  classifier.classify(flippedVideo, gotResult);
}

// 結果が得られたとき
function gotResult(results) {
  // 結果は信頼度順に配列に格納される
  // console.log(results[0]);
  currentResults = results;
  label = results[0].label;
}
