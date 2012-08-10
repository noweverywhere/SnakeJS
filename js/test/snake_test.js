/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('SnakeJS#theSnake', {
    setup: function() {
      this.snake = new SnakeJS.Snake();
      this.food = new SnakeJS.Food();
    }
  });


  test('snake exists', function () {
    ok(this.snake, 'it exists');
  });

  test('can eat', function () {
    var eatFunction = this.snake.eat,
      eatIsFunction = typeof this.snake.eat;
    ok(this.snake, 'it exists');
    ok(eatIsFunction === 'function', 'eat is a function');

  });

  test('grows when eating', function () {
    var startingLength = this.snake.attr.length,
      endingLengthShouldBe = startingLength + this.food.attr.value,
      realLength;

    this.snake.eat(this.food);
    realLength = this.snake.attr.length;
    strictEqual(realLength, endingLengthShouldBe, 'the snake grew');
  });

  test('we can change the food type', function (){
    var startingType = this.food.attr.type,
      endingType;
    this.food.changeType('lemon');
    endingType = this.food.attr.type;
    notEqual(endingType, startingType, 'we changed the food type');

  });

  test('pineapple  makes snake supercharged', function (){
    var startingSnake = this.snake.attr.supercharged,
      snakelength = {};
    this.pineapple = new SnakeJS.Food();
    this.newApple = new SnakeJS.Food();
    this.snake = new SnakeJS.Snake(); 
     
    
    this.pineapple.changeType('pineapple');
    this.snake.eat(this.pineapple);
    snakelength.starting = this.snake.attr.length;
    this.snake.eat(this.newApple);
    snakelength.ending  = this.snake.attr.length;

    equal(this.snake.attr.superpowered, true, 'the snake became superchared');
    equal(snakelength.ending, snakelength.starting, 'the snake did not grow while supercharged');

  });

  test('snake can move', function () {
    var startPosition = this.snake.attr.head.x,
      endPosition;
    this.snake.move();
    endPosition = this.snake.attr.head.x;
    
    equal(this.snake, this.snake, 'the snake did not grow while supercharged');

  });

  module('SnakeJS#TheFood', {
    setup: function() {
      this.snake = new SnakeJS.Snake();
      this.map = new SnakeJS.Map();
    }
  });
 
}(jQuery));
