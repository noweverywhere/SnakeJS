var SnakeJS = SnakeJS || {};


SnakeJS.Game = function (options) {
  // each game can have it's own closure with player id's
  // duration and sizes
  var Game = this;
  Game.attr = options || {
    'size': {
      'x': 20,
      'y': 20,
      'mapstyle': 'canvas',
      'steptime': 100 //later want to find less arbitrary step time
    }
  };

  Game.init();
  return Game; 
};

SnakeJS.Game.prototype.render = function () {
  // only rendering the map for now, may 
  // want to add a clock etc later
  this.map.startrender();
};

SnakeJS.Game.prototype.init = function () {
  // rather than run all this in the constructor 
  // let's do it here
  this.ticker = new SnakeJS.Ticker(this.attr.steptime);
  // make sure to pass the size of the game to the map
  this.map = new SnakeJS.Map(this.attr.size);
  this.snake = new SnakeJS.Snake();
  this.ticker.addUpdateFunction(
    {
      'id': 'map',
      func: this.map.update
    },
    {
      'id': 'snake',
      'func': this.snake.update
    });
  this.map.addObject(this.snake);
};

SnakeJS.Game.prototype.start = function () {
  //for some reason I feel like you should make the game start
  // and should not be able to just make the ticker start
  this.ticker.start();
  this.render();
  console.log('gmae start');
};

SnakeJS.Game.prototype.pause = function () {
  // at this time the we only need to stop the interval
  // later pausing the game may become more complicated
  this.ticker.stop();
};

SnakeJS.Game.prototype.stop = function () {
  // may want to remove this level as well
  this.ticker.stop();
};