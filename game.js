buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];

var level = 0;

function nextSequence() {

  level++;
  $("h1").text("level " + level)

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];

  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColor + '.mp3');
  audio.play();
}


$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  var lastAnswerIndex = userClickedPattern.length - 1
  checkAnswer(lastAnswerIndex);

  playSound(userChosenColor);

  animatePress(userChosenColor);
})


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern.splice(0, userClickedPattern.length)
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game over, Press Any Key to Restart!");

    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + '.mp3');
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  startOver();
  nextSequence();
})
