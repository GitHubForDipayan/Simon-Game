// $("h1").css("#level-title");

// var buttonColours = ["red", "blue", "green", "yellow"];

// var randomChosenColour = buttonColours[nextSequence()];

// var gamePattern = [];
// gamePattern.push(randomChosenColour);

// $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // For Pulse Animation Effect.

// $("button").on("load", function () {
//     var audioSource = ("sounds/" + randomChosenColour + ".mp3");
//     var playSound = new Audio(audioSource);
//     playSound.play();
// });

// function nextSequence() {
//     var randomNumber = Math.floor(Math.random() * 4);
//     return randomNumber;
// }

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var notStarted = true;

$(document).on("keydown", function () {
    $("h1").css("color", "#260c62");
    if (notStarted) {
        nextSequence();
        notStarted = false;
    }
});

$(".btn").click(function () {
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("userClickedPattern Array After Push: " + userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    console.log("userClickedPattern length: " + ((userClickedPattern.length) - 1) );
    checkAnswer(userClickedPattern.length - 1);
    
});

function checkAnswer(currentColour) {

    console.log("In checkAnswer()");
    if (userClickedPattern[currentColour] === gamePattern[currentColour]) 
    {   console.log("Inside first IF");
        if (userClickedPattern.length === gamePattern.length) 
        {
            console.log("Inside second IF");
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        console.log("outside 1st IF");
    }
    else 
    {
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").css("color", "black");

        $("h1").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 2000);
        startOver();
    }
}

function nextSequence() {
    console.log("userClickedPattern Array Before Reset: " + userClickedPattern);
    userClickedPattern = [];
    console.log("userClickedPattern Array After Reset: " + userClickedPattern);

    $("h1").text("LEVEL " + level);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log("gamePattern Array After Push: " + gamePattern);   

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(colourChosen) {
    $("#" + colourChosen).addClass("pressed");

    setTimeout(function () {
        $("#" + colourChosen).removeClass("pressed");
    }, 250);
}

function playSound(chosenColour) {
    var audio = new Audio("sounds/" + chosenColour + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    notStarted = true;
}