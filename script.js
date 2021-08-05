// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyDnO__MK337j_rAqCxv8rTv2gC10NtvGQ0",
    // authDomain: "chatapp-9fbb3.firebaseapp.com",
    // projectId: "chatapp-9fbb3",
    // storageBucket: "chatapp-9fbb3.appspot.com",
    // messagingSenderId: "911276201672",
    // appId: "1:911276201672:web:87604cb80decb51f11f7fd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// const username = prompt("What's your name?");

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const timestamp = Date.now();
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");
  const level = document.getElementById("level");
  const text = document.getElementById("text");
  const Que = question.value;
  const Ans = answer.value;
  const Lev = level.value;
  const Txt = text.value;
  question.value = "";
  answer.value = "";
  level.value = "";
  text.value = "";
  db.ref("questions/" + timestamp).set({
    qu: Que,
    an: Ans,
    le: Lev,
    tx: Txt,
  });
}

const fetchChat = db.ref("messages/");
// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const msg = "<li>" + messages.usr + " : " + messages.msg + "</li>";
//   document.getElementById("messages").innerHTML += msg;
// });
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.usr}: </span>${messages.msg}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});