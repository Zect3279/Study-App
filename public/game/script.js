
var datas = {};

function execute() {
  alert('実行する');
}

function mainClear() {
  document.getElementById('content').innerHTML = '<p class="bookTitle">下から図形を選べ</p>';
}

function bookClear() {
  $("#content").html(`\
  <div class="bookContent">\
    <p class="bookTitle">問題</p>\
    <div class="bookMain" id="quMain">${datas["qu"]}</div>\
    <input type="text" name="answer" id="answer">\
    <button class="clear" onclick="answer()">回答</button>\
  </div>\
  `);
}

$(function() {
  $("#book").click(function() {
    $("#content").html(`\
    <div class="bookContent">\
      <p class="bookTitle">使用公式</p>\
      <div class="bookMain" id="bookMain"></div>\
      <button class="clear" onclick="bookClear()">戻す</button>
    </div>\
    `);
    
    $("#bookMain").html("\\begin\{align\}");

    $("#bookMain").append(datas["book"]);

    $("#bookMain").append("\\end\{align\}");
    
    // id=result の要素をMathJaxで変換 ※ここが重要！！！
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"bookMain"]);
  });
});

url = `qu.json`;

function tri() {
  $.getJSON(url, (data) => {
    var numIndex = Math.floor(Math.random()*2); // 0~10までの整数
    // var numIndex = 0;
    // var index = numIndex.toString;
    var dataList = data["三角形"];
    datas = dataList[numIndex];
    console.log(`qu=${datas["qu"]}, an=${datas["an"]}`);
    $("#content").html(`\
    <div class="bookContent">\
      <p class="bookTitle">問題</p>\
      <div class="bookMain" id="quMain">${datas["qu"]}</div>\
      <input type="text" name="answer" id="answer">\
      <button class="clear" onclick="answer()">回答</button>\
    </div>\
    `);
    // $("quMain").html(datas["qu"]);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  let ctx = document.getElementById('tri').getContext('2d');
   
  // 頂点の座標を用意
  let p1 = {x:150, y:10};   // 上
  let p2 = {x:10,  y:280};  // 左
  let p3 = {x:280, y:280};  // 右

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);      // 始点に移動
  ctx.lineTo(p2.x, p2.y);      // 左側の頂点まで線を描く
  ctx.lineTo(p3.x, p3.y);      // 右側の頂点まで線を描く
  ctx.lineTo(p1.x, p1.y);      // 始点まで線を描く

  ctx.strokeStyle = "tomato";  // 線の色
  ctx.lineWidth = 5;           // 線の太さ
  ctx.stroke();

  ctx.fillStyle = "orange";    // 塗りつぶす色
  ctx.fill();                  // 塗りつぶし
});

var canvas; // canvas要素(HTMLCanvasElement)
var ctx; // 2Dコンテキスト(CanvasRenderingContext2D)
var canvasW = 400; // canvas要素の横幅(px)
var canvasH = 400; // canvas要素の縦幅(px)
var mouseX; // 最後にクリックされた位置のx座標
var mouseY; // 最後にクリックされた位置のy座標

window.onload = function() {
  // canvas要素を取得し、サイズ設定
  canvas = document.getElementById('axisCanvas');
  canvas.width = canvasW;
  canvas.height = canvasH;

  // 描画のために2Dコンテキスト取得
  ctx = canvas.getContext('2d');

  // クリックイベントの登録
  canvas.onclick = function(e) {
    // 一度描画をクリア
    ctx.clearRect(0, 0, canvasW, canvasH);

    // クリック位置の座標計算（canvasの左上を基準。-2ずつしているのはborderの分）
    var rect = e.target.getBoundingClientRect();
    mouseX = e.clientX - Math.floor(rect.left) - 2;
    mouseY = e.clientY - Math.floor(rect.top) - 2;

    // クリック位置を中心に円を描画
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2, false);
    ctx.fill();

    // 座標の表示テキストを描画
    var maxWidth = 100;
    ctx.textAlign = 'right';
    ctx.fillText('( ' + mouseX + ', ' + mouseY + ' )', canvasW - 20, canvasH - 20, maxWidth);
  }
};
