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

  circles.data(arr).transition().duration(2000)
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
   }, 200);
}

var updateBestScore = function() {
  if(scores.curScore > scores.highScore) {
    scores.highScore = scores.curScore;
    d3.select("div.high").select("span").text(scores.highScore);
  }
}

var drag = d3.behavior.drag()
              .on('drag', function() {d3.select(this).attr('cx', Math.max(0,Math.min(d3.event.x, 890)))
                                      .attr('cy', Math.max(0,Math.min(d3.event.y, 590))); });

var checkCollision = function(enemy, collidedCallback) {
  var radiusSum = parseFloat(enemy.attr('r')) + player[0].radius;
  var xDiff = parseFloat(enemy.attr('cx')) - parseFloat(user.attr('cx'));
  var yDiff = parseFloat(enemy.attr('cy')) - parseFloat(user.attr('cy'));
  var separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) );
  if (separation <= radiusSum && !!enemy.attr('flag')) {
    collidedCallback.call(enemy, enemy);
    enemy.attr('flag', true);
  }
  else if(separation > radiusSum && !enemy.attr('flag')) {
    enemy.attr('flag', false);
  }
}

var onCollision = function(enemy) {
  if(!!enemy.attr('flag')){
    scores.collision += 1;
    enemy.attr('flag', true);
  }
  updateBestScore();
  scores.curScore = 0;
  updateScore();
  //d3.select("div.collisions").select("span").text(scores.collision);
  d3.select("div.current").select("span").text(scores.curScore);
}

var scores = {
  curScore: 0,
  highScore: 0,
  collision: 0
}

var collided = false;
var spaceCircles = randomize(30);
var svgContainer = d3.select("body").append("svg")
 // .attr("width", 1100)
 // .attr("height", 900);

var circles = svgContainer.selectAll("circle")
   .data(spaceCircles)
   .enter()
   .append("circle")
   .attr("flag", false);


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

