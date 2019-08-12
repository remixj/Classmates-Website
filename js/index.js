//                                                    670 0
//               261 80                                         870 106
//                                  528 200
//         80 264                                          720 264
//
//                420 517
//                                                        710 502
//
//                                544 569
//
//  under the width of 955

// creat a hash set to restore the area the user just selected
var selected_area_code = new Set();
var count = 1;
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
  var div_element = $(this).parent().parent();
  var div_x = div_element.offset().left,
    div_y = div_element.offset().top;

  var svg_element = $(this).parent();
  // svg_x -> svg element to the left boarder of website
  // svg_y -> svg element to the top boarder of website
  var svg_x = svg_element.offset().left,
    svg_y = svg_element.offset().top;
  // mouse_x -> mouse click posision to the left boarder of website
  // mouse_y -> mouse click position to the top boarder of website
  var mouse_x = click.pageX,
    mouse_y = click.pageY;
  var CN_code = click.target.id;
  $("#" + CN_code).toggleClass("selected");
  var CN_area = $("#"+CN_code).attr("title");
  console.log(CN_area);
  // create_circle_outside_svg(mouse_x - div_x, mouse_y - div_y);
  create_popover_outside_svg(mouse_x - div_x, mouse_y - div_y, CN_area);
  // create_line_inside_svg(mouse_x - svg_x, mouse_y - svg_y);
  // create_circle_inside_svg(mouse_x - svg_x, mouse_y - svg_y);
  // update the hash set
  if (selected_area_code.has(CN_code)) {
    selected_area_code.delete(CN_code);
  } else {
    selected_area_code.add(CN_code);
  }
});

function create_circle_outside_svg(x, y) {
  var circle_code = '<div class="circle-base" style="left : ' + x + 'px; top : ' + y + 'px; "></div>';
  $(".map-svg").prepend(circle_code);
}

// generate popover outside svg in the map-svg div tag
function create_popover_outside_svg(x, y, CN_area) {
  var user_id = 'user_' + String(count);
  var code = generate_popover_code(x, y, user_id, CN_area);

  $(".map-svg").prepend(code);
  // to make sure every pop over tag could be generate popover correctly
  $(document).ready(function() {
    $('[data-toggle="popover"]').popover();
  });
  $("#" + user_id).attr("data-content", "<em>Hello</em> world<img class='classmate-img' src='img/" + user_id + ".jpg'>");
  count++;
}

// generate popover code
function generate_popover_code(x, y, user_id, CN_area) {
  // popover title should contain information like position may be the province the user submitted
  var popover_title = 'popover - title';
  // the most important thing is to define the structure of popover content html
  var img_path = "img/" + user_id + ".jpg";

  // and we add the popover code into the map
  return '<a role="button" id="' + user_id + '" data-html = "true" class="circle-base" style="left : ' + x + 'px ; top : ' + y + 'px; " data-toggle="popover" data-placement="top" data-container=".map-svg" data-title="'+ CN_area +'" ></div>';
}

// create a circle inside svg
function create_circle_inside_svg(starting_x, starting_y) {
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

// create a line inside svg
function create_line_inside_svg(starting_x, starting_y) {
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

function makeSVG(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}
