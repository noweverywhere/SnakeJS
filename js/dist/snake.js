/*! SnakeJS - v0.1.0 - 2012-08-20
* https://github.com/noweverywhere/SnakeJS
* Copyright (c) 2012 Marinus Swanepoel; Licensed MIT, GPL */

var SnakeJS = SnakeJS || {};

SnakeJS.Food = function (typeOrAttributes) {
  var Food = this,
    typeoftypeOrAttributes = typeof typeOrAttributes;
  Food.attr = {};
  Food.attr.defaults = {
    'type': 'apple',
    'value': 1
  };

  if (typeoftypeOrAttributes === 'string') {
    // we were passed a string so we can assume it the name of 
    // a fruit
    this.changeType(typeOrAttributes);
  } else if (typeoftypeOrAttributes === 'object') {
    Food.attr = {
      'type': typeOrAttributes.type || this.attr.defaults.type,
      'value': typeOrAttributes.value || this.attr.defaults.value
    };
  } else {
    Food.attr = {
      'type': this.attr.defaults.type,
      'value': this.attr.defaults.value
    };
  }
  return Food;  
};

SnakeJS.Food.prototype.changeType = function (typename) {
  // since I just read this article:
  // http://www.scirra.com/blog/76/how-to-write-low-garbage-real-time-javascript
  // I plan on re-using objects. This will make it easier
  switch (typename) {
    case 'lemon':
      this.attr.type = 'lemon';
      this.attr.value = 2;
      break;
    case 'pineapple':
      this.attr.type = 'pineapple';
      this.attr.value = 0;
      break;
    default:
      this.attr.type = this.attr.defaults.type;
      this.attr.value = this.attr.defaults.value;
      break;
  }
};

var SnakeJS = {};


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
var requestAnimationFrame = 
  window.requestAnimationFrame || 
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || 
  window.msRequestAnimationFrame,
  animationFunction;
window.requestAnimationFrame = requestAnimationFrame;

SnakeJS.Map = function (size) {
  // constructor function for map
  var Map = this;
  Map.attr = {
    'size': size
  };
  Map.Make();
  return Map;
};

SnakeJS.Map.prototype.Make = function () {
  // make a two dimensional object to match
  // the grid (width and height) of the map
  var x = 0,
    y;
  this.blocks = {};
  // first do the x-axis
  for (x; x < this.attr.size.x; x += 1) {
    y = 0;
    this.blocks[x] = {};
    // then add the y-axis
    for (y; y < this.attr.size.y; y += 1) {
      this.blocks[x][y] = {};
    }
  }
};

SnakeJS.Map.prototype.Destroy = function () {
  // I can imagine doing an elaborate animation that destroys
  // the map a few blocks at a time, for now I will just reset it
  this.blocks = {};
};

SnakeJS.Map.prototype.render = function (Map) {
  // I need pass in the Map object that refers to a
  // SnakeJS.Map instance. Since this function will
  // be called using requestAnimationFrame "this" will
  // refer to the window. Else I can use this:
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
  //console.log('render', this);

  
};

SnakeJS.Map.prototype.stoprender = function () {
  // if you want to stop the requestAnimationFrame loop
  this.stop = true;
};

SnakeJS.Map.prototype.startrender = function () {
  // these variables below are used to pass
  // information to the function that will be 
  // run using requestAnimationFrame.
  var Map = this,
    // store the MapObject that is referred to by "this"
    // in a variable I can reference in the scope of a function
    // defined in this scope here.
    intervalFunction = function () {
      //create a function that returns a function,
      // this function that is returned is an encapsulation
      // of the scope
      var runfunction = function () {
        // this "runfunction" is the function that will actually
        // be called during the requestAnimationFrame
        // call render on the map object using it's own scope
        Map.render();
        // here the function calls itself using the 
        // requestAnimationFrame api if the map is not 
        // supposed to be stopped call itself
        if (Map.stop !== true) {
          requestAnimationFrame(runfunction);
        }
      };
    return runfunction;
  };
  if (requestAnimationFrame) {
    requestAnimationFrame(intervalFunction());
  } else {
    // if requestAnnimationFrame is not available
    // we might just have to go with setInterval. Else
    // we, can change 
    setInterval();
  }
  this.stopRender = false;

};

SnakeJS.Map.prototype.addObject = function (object) {
  // will need to figure out how to make objects interact
  if (object.attr && object.attr.x) {

  }
};
SnakeJS.Snake = function (description) {
  // each snake must have it's own closure
  // the description will be a JSON object
  // with key-value pairs describing the snake

  var Snake = this;

  Snake.attr = description || {
    'color': 'red',
    'length': 2,
    'speed': 1,
    // the property head describes where the snake's
    // head is at. Maybe this should not have a default
    'head': { 
      'x': 1,
      'y': 0,
      'targetBlock': {}
    },
    'direction': 'up',
    // when the snake is uper
    'superpowered': false
  };

  return Snake;
};

SnakeJS.Snake.prototype.update = function () {
  if (this.keypress) {
    switch (this.keypress) {
      case 38 || 87:
        this.attr.direction = 'up';
      break;
      case 39 || 68:
        this.attr.direction = 'right';
      break;
      case 40 || 83:
        this.attr.direction = 'down';
      break;
      case 37 || 65:
        this.attr.direction = 'left';
      break;
    }
  }
  //every step that the snake updates it should move 
  this.move();
};

SnakeJS.Snake.prototype.eat = function (food) {
  //the snake will have to eat something
  if (this.attr.superpowered === false) {
    this.attr.length = this.attr.length + food.attr.value;
  }
  if (food.attr.type === 'pineapple') {
    this.attr.superpowered = true;
  }
};

SnakeJS.Snake.prototype.move = function () {
  // the snake will have to move
  var direction = this.direction;
  switch (direction) {
    case 'up':
      this.attr.head.targetBlock.y = this.attr.head.y + 1;
      this.attr.head.targetBlock.x = this.attr.head.x;
    break;
    case 'right':
      this.attr.head.targetBlock.y = this.attr.head.y;
      this.attr.head.targetBlock.x = this.attr.head.x + 1;
    break;
    case 'down':
      this.attr.head.targetBlock.y = this.attr.head.y - 1;
      this.attr.head.targetBlock.x = this.attr.head.x;
    break;
    case 'left':
      this.attr.head.targetBlock.y = this.attr.head.y;
      this.attr.head.targetBlock.x = this.attr.head.x - 1;
    break;
  }
};
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
