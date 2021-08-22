
var datas = {};
var onGame = false;
var quPoints = 1;
var tiCounter = 20;

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


function countDown() {
  $("#execute").html(`${tiCounter}秒`);
  tiCounter--;
  if (tiCounter == 0) {
    clearInterval(this)
  }
}


function answer() {
  const answer = document.getElementById("answer");
  const Ans = answer.value;
  answer.value = "";
  console.log(`入力：${Ans}\n回答：${datas["an"]}`);
  if (Ans == datas["an"]) {
    $("#content").html(`\
    <div class="bookContent">
      <p class="bookTitle">正解<br>${datas["point"]}ポイント 加算した<br><br>下から次の図形を選べ</p>
    </div>
    `)
    // points += Number(datas["point"]);
    // quPoints += 1;
    // console.log(quPoints);
    // $("#pointCounter").html(`<p>${quPoints}</p>`);
    const count = document.getElementById("pointCounter");
    console.log(count.value);
    count.value++;
    console.log(count.value);
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
    setInterval("countDown()", 1000);
    setTimeout(function(){
      const count = document.getElementById("pointCounter");
      window.location.href = `../result/index.html?id=${count.value}`;
    }, 20*1000);
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
    // var numIndex = Math.floor(Math.random()*3); // 0~2までの整数
    // var numIndex = 0;
    // var index = numIndex.toString;
    var dataList = data["三角形"];
    datas = dataList[Math.floor(Math.random()*3)];
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
    // var numIndex = Math.floor(Math.random()*2); // 0~10までの整数
    // var numIndex = 0;
    // var index = numIndex.toString;
    var dataList = data["直線"];
    datas = dataList[Math.floor(Math.random()*3)];
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
    // var numIndex = Math.floor(Math.random()*3); // 0~10までの整数
    // var numIndex = 0;
    // var index = numIndex.toString;
    var dataList = data["四角形"];
    datas = dataList[Math.floor(Math.random()*3)];
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



// var counter = document.getElementById("counter");
// counter.innerHTML = points.toString;

onload = function() {
  // /* 線を引く */
  // var line_canvas = document.getElementById("line"); 
  // var line_ctx = line_canvas.getContext("2d");
  // line_ctx.beginPath();
  // // 開始位置に移動する
  // line_ctx.moveTo(10, 10);
  // // 線を引く
  // line_ctx.lineTo(40, 40);
  // line_ctx.closePath();
  // line_ctx.stroke();
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