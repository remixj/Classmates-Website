// creat a hash set to restore the area the user just selected
var selected_area_code = new Set();

// fill color select
$("#inputGroupSelect01").change(function(selection) {
  change_map_fill_color(selection.target.value);
});

// boarder color select
$("#inputGroupSelect02").change(function(selection) {
  change_map_boarder_color(selection.target.value);
});

function change_map_fill_color(fill_color) {
  $("svg").attr("fill", fill_color);
}

function change_map_boarder_color(boarder_color) {
  $("svg").attr("stroke", boarder_color);
}

$("path").click(function(click) {
  // click.target.id -> CN-65
  var svg_element = $(this).parent();
  // svg_x -> svg element to the left boarder of website
  // svg_y -> svg element to the top boarder of website
  var svg_x = svg_element.offset().left,
    svg_y = svg_element.offset().top;
  var mouse_x = click.pageX,
    mouse_y = click.pageY;

  console.log(mouse_x - svg_x, mouse_y - svg_y);
  create_line(mouse_x - svg_x, mouse_y - svg_y);
  create_circle(mouse_x - svg_x, mouse_y - svg_y);

  var CN_code = click.target.id;
  $("#" + CN_code).toggleClass("selected");
  // update the hash set
  if (selected_area_code.has(CN_code)) {
    selected_area_code.delete(CN_code);
  } else {
    selected_area_code.add(CN_code);
  }
});

function create_circle(starting_x, starting_y) {
  var circle = makeSVG('circle', {
    cx: Number(starting_x),
    cy: Number(starting_y),
    r: 4,
    stroke: 'white',
    'stroke-width': 2,
    fill: 'red'
  });
  document.getElementById('china-map').appendChild(circle);
}

function create_line(starting_x, starting_y){
  //<path d="m 610,406 40,0" stroke="red" fill="red"></path>
  var line_code = "m " + starting_x + "," + starting_y + " 10" + "," + "10";
  var line = makeSVG('path', {
    d: line_code,
    fill: "red",
    stroke: "red",
    "stroke-width": 3
  });
  document.getElementById('china-map').appendChild(line);
}

function generate_proper_line_code(starting_x, starting_y) {

}

function makeSVG(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}
