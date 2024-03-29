function Location(x,y){
  this.x = Number(x);
  this.y = Number(y);
}

var panZoomTiger = svgPanZoom('#china-map',{
  controlIconsEnabled: true,
  dblClickZoomEnabled: false,
  beforeZoom : hide_all_popover,
  // onZoom : show_all_popover,
  beforePan : hide_all_popover,
  // onPan : show_all_popover
  });

function hide_all_popover (){
  $("circle").popover('hide');
}

function show_all_popover(){
  $("circle").popover('show');
}

// creat a hash set to restore the area the user just selected
var selected_area_code = new Set();
var count = 1;
// var last_choosing_position = "";
var current_circle_id = 0;
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
  var div_element = $(this).parent().parent()
  var div_x = div_element.offset().left
  var div_y = div_element.offset().top
  var svg_element = $(this).parent();
  var svg_x = svg_element.offset().left;
  var svg_y = svg_element.offset().top;
  var mouse_x = click.pageX;
  var mouse_y = click.pageY;
  var context = {
    r: 4,
    "stroke": "white",
    "stroke-width": 2,
    "fill": "red",
  }
  // createCircleInsideSVG(mouse_x-svg_x, mouse_y-svg_y, context);
  var CN_code = click.target.id;
  $("#"+CN_code).toggleClass("selected", true);

  var CN_area = $("#"+CN_code).attr("title");
  // create_popover_outside_svg(mouse_x, mouse_y, CN_area);
  if(current_circle_id != 0)
    $('#outside-circle-'+current_circle_id).remove();
  current_circle_id ++ 
  // create_circle_outside_svg(mouse_x, mouse_y, current_circle_id);
  createCircleInsideSVG(mouse_x, mouse_y)

  // $(".id_position").setAttribute("placehoder", String(mouse_x)+","+String(mouse_y));
  $("#id_position").attr("value", String(Math.round(mouse_x-svg_x))+","+String(Math.round(mouse_y-svg_y)));
  // last_choosing_position = String(mouse_x)+","+String(mouse_y);
})

var markCityInsideSVG = function(x, y, context) {
  var context = {
    ...context,
    cx: Number(x),
    cy: Number(y),
  }

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  for (var k in context)
    circle.setAttribute(k, context[k]);

  $("#china-map").children()[0].appendChild(circle);
}

var createCircleInsideSVG = function(x, y, circle_id) {
  var origin_position = new Location(x, y);
  var new_position = transformLocation(origin_position);

  var circle = makeSVG('circle', {
    cx: Number(new_position.x),
    cy: Number(new_position.y),
    r: 4,
    "stroke": 'white',
    "stroke-width": 0,
    "fill": 'white',
    "id": "position_dot_"+String(circle_id),
  })

  $("#china-map").children()[0].appendChild(circle);
}

function transformLocation(mouse_offset){
  var standard_1_offset = new Location($("#standard_1").offset().left,$("#standard_1").offset().top) ,
    standard_2_offset = new Location($("#standard_2").offset().left,$("#standard_2").offset().top) ,
    standard_1_origin = new Location($("#standard_1").attr("cx"),$("#standard_1").attr("cy")),
    standard_2_origin = new Location($("#standard_2").attr("cx"),$("#standard_2").attr("cy"));
  var delta_x = (mouse_offset.x - standard_2_offset.x) * (standard_1_origin.x - standard_2_origin.x) / (standard_1_offset.x - standard_2_offset.x);
  var delta_y = delta_x * (mouse_offset.y - standard_2_offset.y) / (mouse_offset.x - standard_2_offset.x);
  var new_position = new Location(standard_2_origin.x + delta_x , standard_2_origin.y + delta_y);
  return new_position;
}
// function create_circle_outside_svg(x, y, circle_id) {
//   var circle_code = '<div class="circle-base" style="left : ' + x + 'px; top : ' + y + 'px; " id="outside-circle-' + circle_id + '"></div>';
//   console.log("circle code generated");
//   $(".map-svg").prepend(circle_code);
// }

// generate popover outside svg in the map-svg div tag
// function create_popover_outside_svg(x, y, CN_area) {
//   var user_id = 'user_' + String(count);
  
//   var code = generate_popover_code(x, y, user_id, CN_area);
//   $(".map-svg").prepend(code);
//   // to make sure every pop over tag could be generate popover correctly
//   $(document).ready(function() {
//     $('[data-toggle="popover"]').popover();
//   });
//   $("#" + user_id).attr("data-content", "<em>Hello</em> world<img class='classmate-img' src='img/" + user_id + ".jpg'>");
//   count++;
// }

// generate popover code
// function generate_popover_code(x, y, user_id, CN_area) {
//   // popover title should contain information like position may be the province the user submitted
//   var popover_title = 'popover - title';
//   // the most important thing is to define the structure of popover content html
//   var img_path = "img/" + user_id + ".jpg";

//   // and we add the popover code into the map
//   return '<a role="button" id="' + user_id + '" data-html = "true" class="circle-base" style="left : ' + x + 'px ; top : ' + y + 'px; " data-toggle="popover" data-placement="top" data-container=".map-svg" data-title="'+ CN_area +'" ></a>';
// }

function makeSVG(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}