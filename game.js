let gamePattern = [];
let userClickedPattern = [];

let buttonColours = ['red','blue','green','yellow'];
let started = false;
let level = 0;


$(document).on('keypress',function(){
    if(started != true)
    {
        gamePattern = [];
        level = 0;
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    } 
})


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber =  Math.floor(4*(Math.random()));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
                                                       

$('.btn').on('click',function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})



function checkAnswer(currLevel){
    if(userClickedPattern[currLevel] == gamePattern[currLevel])
    {
        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else
    {
        $('body').addClass("game-over");

        setTimeout(function(){
            $('body').removeClass("game-over");
        },100)

        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound('wrong');
        started = false;
    }
    
}



function playSound(name){
    var audio = new Audio(name + ".mp3");
    audio.play();
}


function animatePress(currColour){

    $("#" + currColour).addClass("pressed");

    setTimeout(function(){
        $('#'+currColour).removeClass('pressed');
    },100)

}