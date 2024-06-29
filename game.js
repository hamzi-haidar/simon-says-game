const btns = document.querySelectorAll(".btn");
const title = document.querySelector("#level-title");

let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let gettingPattern = false;

//for the next level start
function nextSequence() {
  gettingPattern = true;
  const random = Math.random() * 4;

  gamePattern.push(btns[Math.floor(random)].id);

  const btn = Array.from(btns).find(
    (btn) => btn.id === gamePattern[gamePattern.length - 1]
  );
  setTimeout(() => {
    gettingPattern = false;
    new Audio(`sounds/${btn.id}.mp3`).play();
    btn.classList.add("pressed");

    setTimeout(() => {
      btn.classList.remove("pressed");
    }, 200);
  }, 600);
}

document.addEventListener("keypress", () => {
  if (!started) {
    document.body.style.backgroundColor = "#011F3F";
    document.querySelector("#level-title").textContent = `Level ${level}`;
    nextSequence();

    started = true;
  }
});

btns.forEach((btn) => {
  btn.addEventListener("mousedown", (e) => {
    if (gettingPattern || !started) return;
    document.body.style.backgroundColor = "#004d00";
    e.target.classList.add("pressed");

    new Audio(`sounds/${e.target.id}.mp3`).play();
    userClickedPattern.push(e.target.id);

    if (
      userClickedPattern.length === gamePattern.length &&
      JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)
    ) {
      userClickedPattern = [];
      level++;
      nextSequence();

      document.querySelector("#level-title").textContent = `Level ${level}`;
      document.body.style.backgroundColor = "#011F3F";
    } else if (
      JSON.stringify(userClickedPattern) !==
      JSON.stringify(gamePattern.slice(0, userClickedPattern.length))
    ) {
      new Audio(`sounds/wrong.mp3`).play();
      userClickedPattern = [];
      gamePattern = [];
      started = false;
      level = 0;
      title.textContent = "Game Over, Press Any Key to Restart";
      title.style.fontSize = "30px";
      document.body.style.backgroundColor = "orangeRed";
      setTimeout(() => {
        document.body.style.backgroundColor = "#011F3F";
      }, 400);
    }
  });

  btn.addEventListener("mouseup", (e) => {
    e.target.classList.remove("pressed");
  });
});
