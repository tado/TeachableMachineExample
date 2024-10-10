/* ===
Teachable Machine + p5.js + ml5 サンプルコード
事前にTeachable Machineで訓練されたカスタマイズモデルと
p5.js + ml5.jsを使ったウェブカメラ画像の分類。
Emojiカメラ
=== */

// 学習してアップロードしたモデルのURL
// !!ここに自分のモデルのURLを入力!!
let imageModelURL = "https://teachablemachine.withgoogle.com/models/UCMSny7yP/";

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
  createCanvas(640, 480);
  textSize(200);
  textAlign(CENTER, CENTER);
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
  //もし分類結果があれば、それに応じた絵文字を表示
  if (currentResults.length > 0) {
    switch (currentResults[0].label) {
      case "normal":
        text("😐", width / 2, height / 2);
        break;
      case "sad":
        text("😔", width / 2, height / 2);
        break;
      case "smile":
        text("😊", width / 2, height / 2);
        break;
    }
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
