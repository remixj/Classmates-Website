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
  $(".map-svg").prepend(circle_code);
}

// generate popover outside svg in the map-svg div tag
// function create_popover_outside_svg(x, y, data) {
//   var user_id = 'user_' + String(count);
//   province = person_data["locating_province"];
//   var code = generate_popover_code(x, y, user_id, province);
//   console.log(code);
  
//   $(".map-svg").prepend(code);
//   // to make sure every pop over tag could be generate popover correctly
//   $(document).ready(function() {
//     $('[data-toggle="popover"]').popover();
//   });
//   $("#" + user_id).attr("data-content", "<em>Hello</em> world<img class='classmate-img' src='img/" + user_id + ".jpg'>");
//   count++;
// }

// generate popover code
function generate_popover_code(x, y, user_id, province) {
  // popover title should contain information like position may be the province the user submitted
  var popover_title = 'popover - title';
  // the most important thing is to define the structure of popover content html
  var img_path = "img/" + user_id + ".jpg";

  // and we add the popover code into the map
  return '<a role="button" id="' + user_id + '" data-html = "true" class="circle-base" style="left : ' + x + 'px ; top : ' + y + 'px; " data-toggle="popover" data-placement="top" data-container=".map-svg" data-title="'+ province +'" ></a>';
}


// generate popover outside svg in the map-svg div tag
function create_popover_outside_svg(x, y, person_data) {
  // var user_id = 'user_' + String(count);
  var user_id = person_data['id'];
  var province = person_data["locating_province"];
  var code = generate_popover_code(x, y, user_id, province);
  
  $(".map-svg").prepend(code);
  // to make sure every pop over tag could be generate popover correctly
  $(document).ready(function() {
    $('[data-toggle="popover"]').popover();
  });

// pk
// name   = models.CharField(max_length=10)
// email  = models.EmailField(blank=True, null=True)
// phone  = models.CharField(max_length=10, blank=True, null=True)
// graduation_class   = models.ForeignKey(Class, on_delete=models.CASCADE)
// locating_province  = models.ForeignKey(Province, on_delete=models.CASCADE)
// locating_city      = models.CharField(max_length=10, blank=True, null=True)
// position           = models.CharField(max_length=10,default="")
// work_or_study      = models.CharField(max_length=10, choices=WS_STATUS, blank=True, null=True)
  
  // we should get user informaion from database and it should contain the basic information like that
  var user_hashmap = {
    user_hash_id: person_data['pk'], // should be a unique id for a user
    user_img: "img/user_1.jpg",
    user_name: person_data['name'],
    user_gender: "male",
    user_email: person_data['email'],
    user_tele: person_data['phone'],
    user_DoB: "1997.01.14",
    user_status: person_data['work_or_study'] == "s" ? true : false, // true -> student false -> employed
    user_subordin: person_data['graduation_class']
  };
  var display_info = ["user_img", "user_name", "user_gender", "user_email", "user_tele", "user_DoB", "user_status", "user_subordin"];
  var display_opt =  [   false   ,     true   ,     true     ,     true    ,     true   ,    false  ,       true   ,      true      ];
  var display_arr = [];
  for (var i = 0; i < display_info.length; i++) {
    if (display_opt[i])
      display_arr.push(display_info[i]);
  }
  $("#" + user_id).attr("data-content", generate_information(display_arr, user_hashmap));
  // $("#" + user_id).attr("data-content", "<em>Hello</em> world<img class='classmate-img' src='img/" + user_id + ".jpg'>");
  count++;
}


function generate_information(display_arr, user_hashmap) {
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
        popover_content += '<div><p>';
        popover_content += '<i class="fas fa-envelope" aria-hidden="true"></i>' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_tele":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p>';
        popover_content += '<i class="fas fa-phone" aria-hidden="true"></i>' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_DoB":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p>';
        popover_content += '<i class="fas fa-birthday-cake" aria-hidden="true"></i>' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_status":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p>';
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