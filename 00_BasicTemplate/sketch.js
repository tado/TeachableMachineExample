/* ===
Teachable Machine + p5.js + ml5 サンプルコード
事前にTeachable Machineで訓練されたカスタマイズモデルと
p5.js + ml5.jsを使ったウェブカメラ画像の分類。
=== */

// 学習してアップロードしたモデルのURL
// !!ここに自分のモデルのURLを入力!!
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/8dyZwOgL4/';

// クラス分類器の変数
let classifier;
// ビデオ
let video;
// クラス分類の結果を保存するための変数
let label = "";

// 最初にモデルを読み込む
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json", {
    flipped: true,
  });
}

function setup() {
  createCanvas(640, 500);
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

  // ラベルを描画
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// 現在のビデオフレームを分類する
function classifyVideo() {
  classifier.classify(flippedVideo, gotResult);
}

// 結果が得られたとき
function gotResult(results) {
  // 結果は信頼度順に配列に格納される
  // console.log(results[0]);
  label = results[0].label;
}
