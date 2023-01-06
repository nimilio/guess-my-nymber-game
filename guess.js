"use strict";

let easy = false;
let medium = false;
let hard = false;
let level;
let previousLevel;

let easyNumber = Math.trunc(Math.random() * 20) + 1;
let easyScore = 20;
let mediumNumber = Math.trunc(Math.random() * 70) + 1;
let mediumScore = 30;
let hardNumber = Math.trunc(Math.random() * 100) + 1;
let hardScore = 40;
let highScore = 0;
let game = true;
let checkEasyEventListenerAdded = false;
let checkMediumEventListenerAdded = false;
let checkHardEventListenerAdded = false;

// color for level choice
const levelColor = function (currentLevel) {
  document.querySelector(`.${currentLevel}`).style.backgroundColor = "#FFFF00";
  if (previousLevel) {
    if (previousLevel !== currentLevel) {
      highScore = 0;
      document.querySelector(".label-highscore").textContent =
        "🥇 Highscore: 0";
      previousLevel = currentLevel;
    }
  } else previousLevel = currentLevel;
};

// function for .message class
const message = function (text) {
  document.querySelector(".message").textContent = text;
};

// function for .label-score class
const labelScore = function (digit) {
  document.querySelector(".label-score").textContent = `💯 Score: ${digit}`;
};

// function for correct number
const correct = function (gameScore, gameNumber) {
  labelScore(gameScore);
  if (gameScore > highScore) {
    highScore = gameScore;
    document.querySelector(
      ".label-highscore"
    ).textContent = `🥇 Highscore: ${highScore}`;
  }
  document.querySelector(".number").textContent = gameNumber;
  message("Correct number!");
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").style.width = "30rem";
  game = false;
};

function incorrect(gameScore, guess, gameNumber, hardlevel = false) {
  gameScore -= hardlevel ? 2 : 1;
  labelScore(gameScore);
  if (guess > gameNumber && guess - gameNumber >= 20) {
    message("📈 Way too high!");
  } else if (guess < gameNumber && gameNumber - guess >= 20) {
    message("📉 Way too low!");
  } else if (
    guess > gameNumber &&
    guess - gameNumber >= 10 &&
    guess - gameNumber < 20
  ) {
    message("📈 Too high!");
  } else if (
    guess < gameNumber &&
    gameNumber - guess >= 10 &&
    gameNumber - guess < 20
  ) {
    message("📉 Too low!");
  } else if (
    guess > gameNumber &&
    guess - gameNumber > 0 &&
    guess - gameNumber < 10
  ) {
    message("📈 High but close!");
  } else if (
    guess < gameNumber &&
    gameNumber - guess > 0 &&
    gameNumber - guess < 10
  ) {
    message("📉 Low but close!");
  }
  return gameScore;
}

// set the difficulty level

// easy
document.querySelector(".easy").addEventListener("click", function () {
  if (medium === false && hard === false && game) {
    level = "easy";
    levelColor("easy");
    message("Start guessing...");
    labelScore(easyScore);
    easy = true;
    document.querySelector(".between").textContent = "(Between 1 and 20)";

    if (!checkEasyEventListenerAdded) {
      document.querySelector(".check").addEventListener("click", function () {
        const insertedNumber = Number(document.querySelector(".guess").value);
        if (!insertedNumber) {
          message("Please insert a number");

          // correct number
        } else if (insertedNumber === easyNumber && game) {
          correct(easyScore, easyNumber);

          // wrong number
        } else if (insertedNumber !== easyNumber && easyScore > 1 && game) {
          easyScore--;
          message(insertedNumber > easyNumber ? "📈 Too high!" : "📉 Too low!");
          labelScore(easyScore);
        } else if (easyScore === 1) {
          labelScore(0);
          message("Game over!");
          game = false;
        }
      });
      checkEasyEventListenerAdded = true;
    }
  }
});

// medium
document.querySelector(".medium").addEventListener("click", function () {
  if (easy === false && hard === false && game) {
    level = "medium";
    levelColor("medium");
    message("Start guessing...");
    labelScore(mediumScore);
    medium = true;
    document.querySelector(".between").textContent = "(Between 1 and 70)";

    if (!checkMediumEventListenerAdded) {
      document.querySelector(".check").addEventListener("click", function () {
        const insertedNumber = Number(document.querySelector(".guess").value);

        if (!insertedNumber) {
          message("Please insert a number");

          // correct number
        } else if (insertedNumber === mediumNumber && game) {
          correct(mediumScore, mediumNumber);

          // wrong number
        } else if (mediumScore === 1) {
          labelScore(0);
          message("Game over!");
          game = false;
        } else if (insertedNumber !== mediumNumber && mediumScore > 1 && game) {
          mediumScore = incorrect(
            mediumScore,
            insertedNumber,
            mediumNumber,
            false
          );
        }
      });
      checkMediumEventListenerAdded = true;
    }
  }
});

// hard
document.querySelector(".hard").addEventListener("click", function () {
  if (medium === false && easy === false && game) {
    levelColor("hard");
    message("Start guessing...");
    labelScore(hardScore);
    hard = true;
    level = "hard";
    document.querySelector(".between").textContent = "(Between 1 and 100)";

    if (!checkHardEventListenerAdded) {
      document.querySelector(".check").addEventListener("click", function () {
        const insertedNumber = Number(document.querySelector(".guess").value);

        if (!insertedNumber) {
          message("Please insert a number");

          // correct number
        } else if (insertedNumber === hardNumber && game) {
          correct(hardScore, hardNumber);

          // wrong number
        } else if (hardScore === 2) {
          labelScore(0);
          message("Game over!");
          game = false;
        } else if (insertedNumber !== hardNumber && hardScore > 2 && game) {
          hardScore = incorrect(hardScore, insertedNumber, hardNumber, true);
        }
      });
      checkHardEventListenerAdded = true;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  game = true;
  easy = false;
  medium = false;
  hard = false;
  easyScore = 20;
  mediumScore = 30;
  hardScore = 40;
  easyNumber = Math.trunc(Math.random() * 20) + 1;
  mediumNumber = Math.trunc(Math.random() * 70) + 1;
  hardNumber = Math.trunc(Math.random() * 100) + 1;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".between").textContent = "(Number range)";
  labelScore("");
  message("Pick your level");
  if (level)
    document.querySelector(`.${level}`).style.backgroundColor = "#FFFFFF";
});
