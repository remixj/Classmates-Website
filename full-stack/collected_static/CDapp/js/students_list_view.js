var count = 1;
var current_circle_id = 0;

var user_id = 0;
// $("path").click(function(click) {
//   var div_element = $(this).parent().parent()
//   var div_x = div_element.offset().left
//   var div_y = div_element.offset().top
//   var svg_element = $(this).parent();
//   var svg_x = svg_element.offset().left;
//   var svg_y = svg_element.offset().top;
//   var mouse_x = click.pageX;
//   var mouse_y = click.pageY;
//   var context = {
//     r: 4,
//     "stroke": "white",
//     "stroke-width": 2,
//     "fill": "red",
//   }
//   // createCircleInsideSVG(mouse_x-svg_x, mouse_y-svg_y, context);
//   var CN_code = click.target.id;
//   $("#"+CN_code).toggleClass("selected", true);

//   var CN_area = $("#"+CN_code).attr("title");
//   // create_popover_outside_svg(mouse_x, mouse_y, CN_area);
//   if(current_circle_id != 0)
//     $('#outside-circle-'+current_circle_id).remove();
//   current_circle_id ++ 
//   create_circle_outside_svg(mouse_x, mouse_y, current_circle_id);

//   // $(".id_position").setAttribute("placehoder", String(mouse_x)+","+String(mouse_y));
//   $("#id_position").attr("value", String(mouse_x)+","+String(mouse_y));
//   last_choosing_position = String(mouse_x)+","+String(mouse_y);
// })

var createCircleInsideSVG = function(x, y, context) {
  var context = {
    ...context,
    cx: Number(x),
    cy: Number(y),
  }

  var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  for (var k in context)
    circle.setAttribute(k, context[k]);

  document.getElementById("china-map").appendChild(circle);
}

function create_circle_outside_svg(x, y, circle_id) {
  var circle_code = '<div class="circle-base" style="left : ' + x + 'px; top : ' + y + 'px; " id="outside-circle-' + circle_id + '"></div>';
  console.log("circle code generated");
  $(".map-svg").prepend(circle_code);
}

// generate popover outside svg in the map-svg div tag
function create_popover_outside_svg(x, y, CN_area) {
  var user_id = 'user_' + String(count);
  var code = generate_popover_code(x, y, user_id, CN_area);
  console.log(code);
  
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
  return '<a role="button" id="' + user_id + '" data-html = "true" class="circle-base" style="left : ' + x + 'px ; top : ' + y + 'px; " data-toggle="popover" data-placement="top" data-container=".map-svg" data-title="'+ CN_area +'" ></a>';
}