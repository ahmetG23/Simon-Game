var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);


    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);    
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    check();
}); 

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$("body").keydown(function() {
    if(!started) {
        nextSequence();
        started = true;
    }
});

function check() {
    var x = userClickedPattern.length - 1;

    if(userClickedPattern[x] !== gamePattern[x]) {
        gameOver();
    }
    else {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            console.log("next level");
            userClickedPattern.length = 0;
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
}

function gameOver() {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    started = false;
}