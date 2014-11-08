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

var spaceCircles = randomize(30);
var svgContainer = d3.select("body").append("svg")
 .attr("width", 1100)
 .attr("height", 1000);

var circles = svgContainer.selectAll("circle")
   .data(spaceCircles)
   .enter()
   .append("circle");

function update(arr) {
  var spaceCircles = arr;

  circles.data(arr).transition().duration(1000).delay(500)
   .attr("cx", function (d) { return d.X; })
   .attr("cy", function (d) { return d.Y; })
   .attr("r", 10 )

}

 update(randomize(30));

 setInterval(function(){update(randomize(30))}, 2000);

 var Player = function(x, y, r) {
  this.X = x;
  this.Y = y;
  this.radius = r;
  this.highScore = 0;
  this.curScore = 0;
  this.collisions = 0;
 }



 Player.prototype.collision = function() {

 }

 Player.prototype.updateScore = function() {

 }

 var drag = d3.behavior.drag()
              .on('drag', function() {d3.select(this).attr('cx', d3.event.x)
                                             .attr('cy', d3.event.y); })
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





