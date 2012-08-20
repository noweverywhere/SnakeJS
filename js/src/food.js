var SnakeJS = {};

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
