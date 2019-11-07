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
player1.totalScore = 2052;
theGame.swapPlayer();
