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