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
  // console.log(svg_x,svg_y,mouse_x,mouse_y,mouse_x - svg_x,mouse_y - svg_y);
  create_line(mouse_x - svg_x, mouse_y - svg_y);
  var CN_code = click.target.id;
  $("#" + CN_code).toggleClass("selected");
  // update the hash set
  if (selected_area_code.has(CN_code)) {
    selected_area_code.delete(CN_code);
  } else {
    selected_area_code.add(CN_code);
  }
});

function create_line(starting_x, starting_y) {
  // var line_html_code = "<path d='M" + starting_x + " " + starting_y + "'/>";
  // $("svg").append(circle_code);
  var circle = makeSVG('circle', {
    cx: Number(starting_x),
    cy: Number(starting_y),
    r: 4,
    stroke: 'white',
    'stroke-width': 2,
    fill: 'red'
  });
  document.getElementById('china-map').appendChild(circle);
  circle.onmousedown = function() {
    alert('hello');
  };
}

function makeSVG(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}
