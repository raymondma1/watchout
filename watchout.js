// start slingin' some d3 here.
// two classes: one for player and one for enemy
// create random generator to generate x and y coordinates of the
//
var randomize = function(n){
  var results = [];

  for(var i = 0; i < n; i++) {
    var coordinates = {};
    coordinates['X'] = Math.floor(Math.random() * 900);
    coordinates['Y'] = Math.floor(Math.random() * 600);
    results.push(coordinates);
  }
  return results;
}
var update = function(arr) {
  var spaceCircles = arr;

  circles.data(arr).transition().duration(1000)
   .tween("collision", function() {
    // console.log();
    var func = checkCollision;
    var _that = d3.select(this);
    return function(t) {
      checkCollision(_that, onCollision);
    }
   })
   .attr("cx", function (d) { return d.X; })
   .attr("cy", function (d) { return d.Y; })
   .attr("r", 10 )

}


var updateScore = function() {
  setInterval(function(){
   scores.curScore += 1;
   d3.select("div.current").select("span").text(scores.curScore);
   }, 100);
}

var updateBestScore = function() {
  if(scores.curScore > scores.highScore) {
    scores.highScore = scores.curScore;
    d3.select("div.high").select("span").text(scores.highScore);
  }
}

var drag = d3.behavior.drag()
              .on('drag', function() {d3.select(this).attr('cx', d3.event.x)
                                      .attr('cy', d3.event.y); });

var checkCollision = function(enemy, collidedCallback) {
  // debugger;
   // console.log(enemy);
  var radiusSum = parseFloat(enemy.attr('r')) + player[0].radius;
  var xDiff = parseFloat(enemy.attr('cx')) - parseFloat(user.attr('cx'));
  var yDiff = parseFloat(enemy.attr('cy')) - parseFloat(user.attr('cy'));
  // console.log(enem, yDiff);
console.log(radiusSum, xDiff, yDiff);
  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
  // console.log(separation);
  if (separation < radiusSum) {
    collidedCallback();
  }
}

var onCollision = function() {
  var count = 0;
  var func = function() {
    while(count === 0)
    {
      scores.collision += 1;
      count++;
    }
  }();

  updateBestScore();
  scores.curScore = 0;

  d3.select("div.collisions").select("span").text(scores.collision);
  d3.select("div.current").select("span").text(scores.curScore);
}
  updateScore();

var scores = {
  curScore: 0,
  highScore: 0,
  collision: 0
}

var spaceCircles = randomize(30);
var svgContainer = d3.select("body").append("svg")
 .attr("width", 1100)
 .attr("height", 1000);

var circles = svgContainer.selectAll("circle")
   .data(spaceCircles)
   .enter()
   .append("circle");


var Player = function(x, y, r) {
this.X = x;
this.Y = y;
this.radius = r;
}

update(randomize(30));
setInterval(function(){update(randomize(30))}, 2000);

var player = [];
player.push(new Player(450,300,10));
var user = svgContainer.selectAll("user").data(player)
.enter()
.append("circle")
.attr("class", "user")
.call(drag);

user.data(player)
.attr("cx", function (d) { return d.X; })
.attr("cy", function (d) { return d.Y; })
.attr("r", 10 );

