<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simon Game</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <h1 id="level-title">Press Any Key to Start</h1>
  <div id="container">
    <div class="btn" id="palevioletred"></div>
    <div class="btn" id="blue"></div>
    <div class="btn" id="green"></div>
    <div class="btn" id="yellow"></div>
  </div>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    var buttonColours = ["palevioletred", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var started = false;
    var level = 0;

    $(document).keypress(function() {
      if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
    });

    $(".btn").on("click", function() {
      var userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
    });

    function checkAnswer(currentLevel) {
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
          setTimeout(function() {
            nextSequence();
          }, 1000);
        }
      } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
      }
    }

    function nextSequence() {
      userClickedPattern = [];
      level++;
      $("#level-title").text("Level " + level);
      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
    }

    function playSound(name) {
      var audio = new Audio("sounds/" + name + ".mp3");
      audio.play();
    }

    function animatePress(currentColor) {
      $("#" + currentColor).addClass("pressed");
      setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    }

    function startOver() {
      level = 0;
      gamePattern = [];
      started = false;
    }
  </script>
</body>
</html>
