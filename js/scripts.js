//BE Logic Goes Here:

function Player() {
  this.roundScore = 0,
  this.totalScore = 0
}

Player.prototype.roll = function() {
  var roll = Math.ceil((Math.random() * 6));
  console.log(roll);
  if (roll === 1) {
    this.roundScore = 0;
    theGame.swapPlayer();
  } else {
    this.roundScore += roll;
  }
}

Player.prototype.stop = function() {
  this.totalScore += this.roundScore;
  this.roundScore = 0;
  if (this.totalScore >= 100){
    return true;
  }
  return false;
}

function Game(player1, player2) {
  this.player1 = player1,
  this.player2 = player2,
  this.turn = 0,
  this.running = true;
}

Game.prototype.round = function() {
  if (this.running) {
    if ((this.turn % 2) === 0) {
      this.player1.roll();
    } else{
      this.player2.roll();
      //IF TURN IS EVEN!!!
    }
  } else {
    console.log("The game is not active! Reset!");
  }
}
Game.prototype.swapPlayer = function() {
  if ((this.turn % 2) === 0) {
    this.player1.stop();
  } else {
    this.player2.stop();
  }
  if (this.player1.stop() || this.player2.stop()) {
    this.running = false;
  }
  this.turn += 1;
}

Game.prototype.reset = function() {
  this.player1 = new Player();
  this.player2 = new Player();
  this.turn = 0;
  this.running = true;
}

var player1 = new Player();
var player2 = new Player();
var theGame = new Game(player1, player2);
theGame.player1.totalScore = 95;
theGame.player2.totalScore = 95;
// Front End Logic Goes Here:

$(document).ready(function() {
  $(document).click(function(event) {
    $("#player1Round").html(theGame.player1.roundScore);
    $("#player1Total").html(theGame.player1.totalScore);

    $("#player2Round").html(theGame.player2.roundScore);
    $("#player2Total").html(theGame.player2.totalScore);

    switch ((theGame.turn % 2)) {
      case 0:
        $(".player2TotalField").toggleClass("bg-light disabled")
        $(".player1TotalField").toggleClass("pink")
      break;
      case 1:
        $(".player1TotalField").toggleClass("bg-light disabled")
        $(".player2TotalField").toggleClass("pink")
      break;
    }
  })
});
