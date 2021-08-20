
var datas = {};
var onGame = false;

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

function answer() {
  const answer = document.getElementById("answer");
  const Ans = answer.value;
  answer.value = "";
  console.log(`入力：${Ans}\n回答：${datas["an"]}`);
  if (Ans == datas["an"]) {
    $("#content").html(`\
    <div class="bookContent">
      <p class="bookTitle">正解<br>下から図形を選べ</p>
    </div>
    `)
  } else {
    $("#content").html(`\
    <div class="bookContent">
      <p class="bookTitle">不正解<br>下から図形を選べ</p>
    </div>
    `)
  }
}

$(function() {
  $("#book").click(function() {
    if (onGame == false) {
      return;
    }
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

function qu(type) {
  if (onGame == false) {
    onGame = true;
  }
  switch (type) {
    case "tri":
      tri();
      break;
    case "rec":
      rec();
      break;
    case "line":
      line();
      break;
  }
}


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
      <input type="text" name="answer" id="answer">${datas["type"]}<br>\
      <button class="clear" onclick="answer()">回答</button>\
    </div>\
    `);
    // $("quMain").html(datas["qu"]);
  });
}

function line() {
  $.getJSON(url, (data) => {
    var numIndex = Math.floor(Math.random()*2); // 0~10までの整数
    // var numIndex = 0;
    // var index = numIndex.toString;
    var dataList = data["直線"];
    datas = dataList[numIndex];
    console.log(`qu=${datas["qu"]}, an=${datas["an"]}`);
    $("#content").html(`\
    <div class="bookContent">\
      <p class="bookTitle">問題</p>\
      <div class="bookMain" id="quMain">${datas["qu"]}</div>\
      <input type="text" name="answer" id="answer">${datas["type"]}<br>\
      <button class="clear" onclick="answer()">回答</button>\
    </div>\
    `);
    // $("quMain").html(datas["qu"]);
  });
}

function rec() {
  $.getJSON(url, (data) => {
    var numIndex = Math.floor(Math.random()*2); // 0~10までの整数
    // var numIndex = 0;
    // var index = numIndex.toString;
    var dataList = data["四角形"];
    datas = dataList[numIndex];
    console.log(`qu=${datas["qu"]}, an=${datas["an"]}`);
    $("#content").html(`\
    <div class="bookContent">\
      <p class="bookTitle">問題</p>\
      <div class="bookMain" id="quMain">${datas["qu"]}</div>\
      <input type="text" name="answer" id="answer">${datas["type"]}<br>\
      <button class="clear" onclick="answer()">回答</button>\
    </div>\
    `);
    // $("quMain").html(datas["qu"]);
  });
}



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

onload = function() {
  /* 線を引く */
  var line_canvas = document.getElementById("line"); 
  var line_ctx = line_canvas.getContext("2d");
  line_ctx.beginPath();
  // 開始位置に移動する
  line_ctx.moveTo(10, 10);
  // 線を引く
  line_ctx.lineTo(40, 40);
  line_ctx.closePath();
  line_ctx.stroke();
  /* 四角を描く */
  var rect_canvas = document.getElementById("rectangle");
  var rect_ctx = rect_canvas.getContext("2d");
  rect_ctx.beginPath();
  // 四角を描く
  rect_ctx.strokeRect(10, 10, 30, 30);
  // /* 色の付いた円を書く */
  // var cir_canvas = document.getElementById("circle");
  // var cir_ctx = cir_canvas.getContext("2d");
  // // 塗りつぶす色を指定する
  // cir_ctx.fillStyle = 'blue';
  // cir_ctx.beginPath();
  // // 円を描く位置を決める
  // cir_ctx.arc(25, 25, 20, 0, Math.PI * 2, false);
  // // 実際に円を書く
  // cir_ctx.fill();
  // 三角形
  var ctx_tri = document.getElementById('tri');
  var context = ctx_tri.getContext("2d");

  // the triangle
  context.beginPath();
  context.moveTo(25, 10);
  context.lineTo(10, 40);
  context.lineTo(40, 40);
  context.closePath();

  // the outline
  context.lineWidth = 2;
  context.strokeStyle = '#666666';
  context.stroke();

  // the fill color
  // context.fillStyle = "#FFCC00";
  // context.fill();
}