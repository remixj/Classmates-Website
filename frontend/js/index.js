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
  $("#" + CN_code).addClass("selected");
  var CN_area = $("#" + CN_code).attr("title");
  console.log("mouse_x : ",mouse_x,"mouse_y : " , mouse_y);
  console.log($("#standard_1").offset().left,$("#standard_1").offset().top);
  // console.log("svg_x : " , svg_x , "svg_y : " ,  svg_y);
  var mouse_origin = transform_location(new Location(mouse_x,mouse_y));
  // this functino only works using the default zoom rate 1
  // console.log(mouse_origin);
  create_circle_inside_svg(mouse_origin.x , mouse_origin.y , CN_area);

  // create_circle_inside_svg(mouse_x - svg_x, mouse_y - svg_y, CN_area);
  // update the hash set
  if (selected_area_code.has(CN_code)) {
    selected_area_code.delete(CN_code);
  } else {
    selected_area_code.add(CN_code);
  }
});

function transform_location(mouse_offset){
  var standard_1_offset = new Location($("#standard_1").offset().left,$("#standard_1").offset().top) ,
    standard_2_offset = new Location($("#standard_2").offset().left,$("#standard_2").offset().top) ,
    standard_1_origin = new Location($("#standard_1").attr("cx"),$("#standard_1").attr("cy")),
    standard_2_origin = new Location($("#standard_2").attr("cx"),$("#standard_2").attr("cy"));
  var delta_x = (mouse_offset.x - standard_2_offset.x) * (standard_1_origin.x - standard_2_origin.x) / (standard_1_offset.x - standard_2_offset.x);
  // console.log((mouse_offset.x - standard_2_offset.x) , (standard_2_origin.x - standard_1_origin.x) , (standard_2_offset.x - standard_1_offset.x) , delta_x);
  var delta_y = delta_x * (mouse_offset.y - standard_2_offset.y) / (mouse_offset.x - standard_2_offset.x);
  // console.log(delta_x , (mouse_offset.x - standard_2_offset.x) , (mouse_offset.x - standard_2_offset.x) , delta_y);

  var new_position = new Location(standard_2_origin.x + delta_x , standard_2_origin.y + delta_y);
  // console.log(typeof($("#standard_2").attr("cx")) ,$("#standard_2").attr("cy"),delta_x , delta_y);
  console.log(new_position);
  return new_position;
}

function create_circle_outside_svg(x, y) {
  var circle_code = '<div class="circle-base" style="left : ' + x + 'px; top : ' + y + 'px; "></div>';
  $(".map-svg").prepend(circle_code);
}

// generate popover outside svg in the map-svg div tag
function specify_popover_information(CN_area) {

}
// create a circle inside svg
function create_circle_inside_svg(starting_x, starting_y,CN_area) {
  var user_id = 'user_' + String(count);
  // make circle element
  var circle = makeSVG('circle', {
    cx: Number(starting_x),
    cy: Number(starting_y),
    r: 4,
    stroke: 'white',
    'stroke-width': 0,
    fill: 'white'
  });
  // initial circle element
  circle.setAttribute("role","button");
  circle.setAttribute("id",user_id);
  circle.setAttribute("data-html","true");
  circle.setAttribute("data-toggle","popover");
  circle.setAttribute("data-placement","top");
  circle.setAttribute("data-container",".map-svg");
  circle.setAttribute("data-title",CN_area);
  // add circle element inside svg element
  $("#china-map").children()[0].appendChild(circle);
  $(document).ready(function() {
    $('[data-toggle="popover"]').popover();
  });
  // to make sure every pop over tag could be generate popover correctly
  $(document).ready(function() {
    $('[data-toggle="popover"]').popover();
  });

  // we should get user informaion from database and it should contain the basic information like that
  var user_hashmap = {
    user_hash_id: "asfsfasf", // should be a unique id for a user
    user_img: "img/user_1.jpg",
    user_name: "Bruce Duan",
    user_gender: "male",
    user_email: "dd0elx@qq.com",
    user_tele: "+86 13567960810",
    user_DoB: "1997.01.14",
    user_status: false, // true -> student false -> employed
    user_subordin: "Beijing University of Posts and Telecommunications"
  };

  // choose what to display and what not to
  var display_info = ["user_img", "user_name", "user_gender", "user_email", "user_tele", "user_DoB", "user_status", "user_subordin"];
  var display_opt =  [   true   ,     true   ,     true     ,     true    ,     true   ,    false  ,       true   ,      true      ];
  var display_arr = [];
  for (var i = 0; i < display_info.length; i++) {
    if (display_opt[i])
      display_arr.push(display_info[i]);
  }
  // add popover content with code we just generated
  $("#" + user_id).attr("data-content", generate_popover_content(display_arr, user_hashmap));
  // set the popover default show
  $("#"+user_id).popover('show');
  // that is just bull shit for test
  count++;
}

// generate code for popover content
function generate_popover_content(display_arr, user_hashmap) {
  /*
  <div class="popover-body">
      <div>
      	<img class="classmate-img" src="img/user_1.jpg">
      	<b>Emily Li</b>
          <i class="fas fa-venus" aria-hidden="true"></i>
      </div>
      <div>
          <p><i class="fas fa-envelope" aria-hidden="true"></i>  dd0exclu@163.com</p>
      </div>
      <div>
          <p><i class="fas fa-phone" aria-hidden="true"></i>  +86 13567960810</p>
      </div>
      <div>
      	<p><i class="fas fa-birthday-cake" aria-hidden="true"></i>  1997 01 14</p>
      </div>
      <div>
      	<p></p>
      </div>
      <div>
      	<p><i class="fas fa-graduation-cap" aria-hidden="true"></i>  BUPT</p>
      </div>
  </div>
  */
  var popover_content = '<div>';
  var stack = ['div'];
  for (var i = 0; i < display_arr.length; i++) {
    var user_item = display_arr[i];
    switch (user_item) {
      case "user_img":
        popover_content += '<img class="classmate-img" src="' + user_hashmap[user_item] + '">';
        break;
      case "user_name":
        popover_content += '<b>';
        stack.push('b');
        popover_content += user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_gender":
        if (user_hashmap[user_item] === "male") {
          popover_content += '<i class="fas fa-mars" aria-hidden="true"></i>';
        } else {
          popover_content += '<i class="fas fa-venus" aria-hidden="true"></i>';
        }
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_email":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p class="user-para">';
        popover_content += '<i class="fas fa-envelope" aria-hidden="true"></i>' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_tele":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p class="user-para">';
        popover_content += '<i class="fas fa-phone" aria-hidden="true"></i>' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_DoB":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p class="user-para">';
        popover_content += '<i class="fas fa-birthday-cake" aria-hidden="true"></i>' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_status":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p class="user-para">';
        if (user_hashmap[user_item] === true){
          popover_content += '<i class="fas fa-graduation-cap" aria-hidden="true"></i>';
        }
        else{
          popover_content += '<i class="fas fa-building" aria-hidden="true"></i>';
        }
        break;
      case "user_subordin":
        popover_content += user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      default:
        console.log(user_item);
    }
  }
  return popover_content;
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
