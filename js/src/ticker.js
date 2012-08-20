SnakeJS.Ticker = function (game_step_time) {
  // this object should should keep time for the gmae mechanics
  // and run game logic functions at a regular interval
  var Ticker = this;
  Ticker.attr = {};
  Ticker.attr.steptime = game_step_time;
  Ticker.updateFunctions = {};
  return Ticker;
};

SnakeJS.Ticker.prototype.addUpdateFunction = function () {
  // this is how we add functions taht will be updated.
  // should figure out a way to do this with an ID, so that
  // we can remove spcific functions later
  var i = 0,
    numberOfArguments = arguments.length,
    thisArgument;

  for (i; i < numberOfArguments; i += 1) {
    thisArgument = arguments[i];
     this.updateFunctions[thisArgument.id] = thisArgument.func;
  }
  
  this.numberOfUpdateFunctions = this.updateFunctions.length;
};

SnakeJS.Ticker.prototype.tick = function () {
  // this function is where the game logic mechanics get run
  var functions;
  //console.log('running game logic');
  for(functions in this.updateFunctions) {
    //avoiding making new variables that will have to be garbage collected
    // this function will be running all the time
    if (this.numberOfUpdateFunctions.hasOwnProperty(functions)) {
      functions();
    }
  }
};

SnakeJS.Ticker.prototype.start = function () {
  // simply using a timeout right now,
  // may want to combine this with the request animation frame
  // probably not
  this.interval = setInterval(
    this.tick,
    this.attr.steptime
  );
};
