/*
 * SnakeJS
 * https://github.com/noweveryehre/snakejs
 *
 * Copyright (c) 2012 Marinus Swanepoel
 * Licensed under the MIT license.
 * 
 */
var SnakeJS = {};

SnakeJS.Game = function (options) {
	// each game can have it's own closure with player id's
	// duration and sizes
	this.attr = options || {
		'size': {
			'x': 20,
			'y': 20
		}
	};
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

};


SnakeJS.Food = function () {
	var Food = this;
	Food.attr= {
		'type': 'apple', //possible values are apple, lemon, pineapple
		'value': 1
	};
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
			this.attr.type = 'apple';
			this.attr.value = 1;
			break;
	}
};
