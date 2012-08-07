/*! SnakeJS - v0.1.0 - 2012-08-06
* https://github.com/noweverywhere/SnakeJS
* Copyright (c) 2012 Marinus Swanepoel; Licensed MIT, GPL */

var SnakeJS = {};

SnakeJS.Game = function (options) {
  // each game can have it's own closure with player id's
  // duration and sizes
  var Game = this;
  Game.attr = options || {
    'size': {
      'x': 20,
      'y': 20
    }
  };
  return Game;
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
      'y': 0
    },
    'direction': 0,
    // when the snake is uper
    'superpowered': false
  };

  return Snake;
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
  if (this.direction === 0) {
    this.attr.head.y += 1;
  }

};


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
