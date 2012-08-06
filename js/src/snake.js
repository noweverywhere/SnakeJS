/*
 * SnakeJS
 * https://github.com/noweveryehre/snakejs
 *
 * Copyright (c) 2012 Marinus Swanepoel
 * Licensed under the MIT license.
 * 
 */
var SnakeJS = {};

SnakeJS.Game = function () {
	// each game can have it's own closure with player id's
	// duration and sizes
};

SnakeJS.Snake = function (description) {
	// each snake must have it's own closure
	// the description will be a JSON object
	// with key-value pairs describing the snake

	var Snake = this;

	Snake.description = description || {
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
		'super': false
	};
};

SnakeJS.Snake.prototype.eat = function (object) {
	//the snake will have to eat something
	console.log(this.length);
};


console.log('\nis this snake? ', SnakeJS);