var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern =[];

var started = false;
var level1 = 0;

$(document).keypress( function () {

    
    if (!started){
        $("#level-title").text("Level " + level1);
        nextSequence();
        
        started = true;
        

    }
    

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){
        setTimeout(function () {
            nextSequence();
        }, 1000)}
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }


    
}

function startOver() {
    gamePattern = [];
    level1 =0;
    started = false;
}

$(".btn").on('click', function () {
    var userChosenColour =$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
})



function nextSequence() {

    userClickedPattern = [];

    level1++;
    $("#level-title").text("Level " + level1);

    var randomNumber = Math.floor((Math.random()*3)+ 1);
    var randomChosenColors = buttonColors[randomNumber];
    gamePattern.push(randomChosenColors);
    
    $("#" + randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColors);
}





function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
},100);
}




