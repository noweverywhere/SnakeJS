var requestAnimationFrame = 
  window.requestAnimationFrame || 
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || 
  window.msRequestAnimationFrame,
  animationFunction;
window.requestAnimationFrame = requestAnimationFrame;

SnakeJS.Map = function (size){
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