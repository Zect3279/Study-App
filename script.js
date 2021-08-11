
// document.getElementById("send-message").addEventListener("submit", postChat);
// function postChat(e) {
//   e.preventDefault();
//   const timestamp = Date.now();
//   const question = document.getElementById("question");
//   const answer = document.getElementById("answer");
//   const level = document.getElementById("level");
//   const text = document.getElementById("text");
//   const Que = question.value;
//   const Ans = answer.value;
//   const Lev = level.value;
//   const Txt = text.value;
//   question.value = "";
//   answer.value = "";
//   level.value = "";
//   text.value = "";
//   db.ref("questions/" + timestamp).set({
//     qu: Que,
//     an: Ans,
//     le: Lev,
//     tx: Txt,
//   });
// }

// const fetchChat = db.ref("messages/");
// // fetchChat.on("child_added", function (snapshot) {
// //   const messages = snapshot.val();
// //   const msg = "<li>" + messages.usr + " : " + messages.msg + "</li>";
// //   document.getElementById("messages").innerHTML += msg;
// // });
// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const message = `<li class=${
//     username === messages.username ? "sent" : "receive"
//   }><span>${messages.usr}: </span>${messages.msg}</li>`;
//   // append the message on the page
//   document.getElementById("messages").innerHTML += message;
// });


// document.getElementById("book").addEventListener("click", showBook);
function showBook() {
  // bookContent = `<div class="bookContent"><p class="bookTitle">使用公式</p><div class="bookMain">2次方程式 $ax^2 + bx + c =0$ の根の公式は\[x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}\]</div>" `
  // document.getElementById("content").innerHTML = bookContent;
  alert('Click');
}



// mainContent = `<p>hello</p>`

// document.getElementById("content").innerHTML = mainContent;




function butotnClick(){
  alert('Click');
}

onload=function() {
  let bookButton = document.getElementById('book');
  bookButton.onclick = showBook;
  
  let testButton = document.getElementById('xxx');
  testButton.onclick = butotnClick;

}
