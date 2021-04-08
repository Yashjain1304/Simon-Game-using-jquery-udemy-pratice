var gamePattern = new Array();
var buttonsColours = new Array("red","blue","green","yellow");
var userClickedPattern = [];
var level=0;
var index=0;
var start = false;
$(document).keypress(function(){
  if(start==false){
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  addAnimation(userChosenColour);
  playsound(userChosenColour);
  check(index);
});
function nextSequence(){
  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour= buttonsColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
  playsound(randomChosenColour);
  console.log(randomChosenColour);

}
function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function addAnimation(idOfButton){
  $("#"+idOfButton).addClass("pressed");
  setTimeout(function(){  $("#"+idOfButton).removeClass("pressed");}, 100);

}
function check(i){
  if(userClickedPattern.shift()===gamePattern[i] && i<gamePattern.length)
{
  index++;
  console.log("valid");
  console.log(index);
  if(index==gamePattern.length)
 {
   index=0;
   setTimeout(function(){nextSequence()},1000);
 }
}

else{
  gameOver();
}
}
function gameOver(){
  index=0;
  userClickedPattern=[];
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");}, 200)
  $("#level-title").text("Game Over Press any Key to Start");
  playsound("wrong");
  gamePattern =[];
  level =0;
  start =false;
  console.log("game over");
  console.log("restart game");
}
