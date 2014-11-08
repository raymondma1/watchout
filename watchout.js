// start slingin' some d3 here.
// two classes: one for player and one for enemy
// create random generator to generate x and y coordinates of the
//
var randomize = function(n){
  var results = [];

  var x, y;
  for(var i = 0; i < n; i++) {
    var coordinates = [];
    x = Math.floor(Math.random() * 900);
    y = Math.floor(Math.random() * 600);
    coordinates.push(x);
    coordinates.push(y);
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
   .attr("cx", function (d) { return d[0]; })
   .attr("cy", function (d) { return d[1]; })
   .attr("r", 10 )

}

 update(randomize(30));

 setInterval(function(){update(randomize(30))}, 2000);
