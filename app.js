let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let btns = ["one", "two", "three", "four"];
let h2 = document.querySelector("h2");

document.querySelector(".start").addEventListener("click", function () {
  if (!started) {
    started = true;
    levelup();
  }
});

function gameflash(btn) {
  btn.classList.add("gameflash");
  setTimeout(() => btn.classList.remove("gameflash"), 300);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 300);
}

function levelup() {
  level++;
  h2.innerText = `Level ${level}`;
  userseq = [];
  let randidx = Math.floor(Math.random() * 4);
  let randnum = btns[randidx];
  let randbtn = document.querySelector(`.${randnum}`);
  gameseq.push(randnum);
  gameflash(randbtn);
}

function checkans(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 800);
    }
  } else {
    h2.innerHTML = `Game Over! Your score: <b>${level}</b><br>Click Start to try again.`;
    
    document.body.style.background = "#ff4d4d"; // red background
    setTimeout(() => {
      document.body.style.background = "linear-gradient(to bottom, #1e1e2f, #2b2b40)";
    }, 500); // wait before resetting
    
    reset();
  }
}


function btnpress() {
  let btn2 = this;
  userflash(btn2);
  let usernum = btn2.getAttribute("id");
  userseq.push(usernum);
  checkans(userseq.length - 1);
}

document.querySelectorAll(".btn").forEach(b => b.addEventListener("click", btnpress));

document.querySelector(".reset").addEventListener("click", function () {
  h2.innerText = "Click Start to begin";
  reset();
});

function reset() {
  gameseq = [];
  userseq = [];
  level = 0;
  started = false;
}
