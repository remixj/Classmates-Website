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

var current_circle_id = 0;

var markCityInsideSVG = function(x, y, city_name) {
  var circle = makeSVG('circle', {
    cx: Number(x),
    cy: Number(y),
    r: 3,
    "stroke": "white",
    "stroke-width": 2,
    "fill": "black",
    "id": city_name,
  })

  $("#china-map").children()[0].appendChild(circle);
}

var createPopoverInsideSVG = function(x, y, person_data) {
  var user_id = person_data['id'];
  var origin_position = new Location(x, y);
  var new_position = transformLocation(origin_position);

  var circle = makeSVG('circle', {
    cx: Number(new_position.x),
    cy: Number(new_position.y),
    r: 4,
    "stroke": 'white',
    "stroke-width": 0,
    "fill": 'white',
  })

  circle.setAttribute("role", "button");
  circle.setAttribute("id", user_id);
  circle.setAttribute("data-html", "true");
  circle.setAttribute("data-toggle", "popover");
  circle.setAttribute("data-placement", "top");
  circle.setAttribute("data-container", ".map-svg");
  circle.setAttribute("data-title", person_data["locating_province"]);

  $("#china-map").children()[0].appendChild(circle);
  // $(document).ready(function() {
  //   $('[data-toggle="popover"]').popover();
  // });

  var user_hashmap = {
    user_hash_id: user_id, // should be a unique id for a user
    user_img: person_data['avatar'],
    user_name: person_data['name'],
    user_gender: "male",
    user_email: person_data['email'],
    user_tele: person_data['phone'],
    user_DoB: "1997.01.14",
    user_status: person_data['work_or_study'] == "s" ? true : false, // true -> student false -> employed
    user_subordin: person_data['graduation_class']
  };
  var display_info = ["user_img", "user_name", "user_gender", "user_email", "user_tele", "user_DoB", "user_status", "user_subordin"];
  var display_opt =  [   true   ,     true   ,     true     ,     true    ,     true   ,    false  ,       true   ,      true      ];
  var display_arr = [];
  for (var i = 0; i < display_info.length; i++) {
    if (display_opt[i])
      display_arr.push(display_info[i]);
  }
  console.log(display_arr)
  console.log(user_hashmap)
  $("#" + user_id).attr("data-content", generateInformation(display_arr, user_hashmap));
  $("#" + user_id).popover('show');

// pk
// name   = models.CharField(max_length=10)
// email  = models.EmailField(blank=True, null=True)
// phone  = models.CharField(max_length=10, blank=True, null=True)
// graduation_class   = models.ForeignKey(Class, on_delete=models.CASCADE)
// locating_province  = models.ForeignKey(Province, on_delete=models.CASCADE)
// locating_city      = models.CharField(max_length=10, blank=True, null=True)
// position           = models.CharField(max_length=10,default="")
// work_or_study      = models.CharField(max_length=10, choices=WS_STATUS, blank=True, null=True)

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

// generate code for popover content
function generateInformation(display_arr, user_hashmap) {
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
        popover_content += '<img class="classmate-img" src="' + user_hashmap[user_item] + '" />';
        console.log(user_hashmap[user_item]);
        break;
      case "user_name":
        popover_content += '<b>';
        stack.push('b');
        popover_content += user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>&nbsp;';
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
        popover_content += '<i class="fas fa-envelope" aria-hidden="true"></i>&nbsp;' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_tele":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p class="user-para">';
        popover_content += '<i class="fas fa-phone" aria-hidden="true"></i>&nbsp;' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_DoB":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p class="user-para">';
        popover_content += '<i class="fas fa-birthday-cake" aria-hidden="true"></i>&nbsp;' + user_hashmap[user_item];
        popover_content += '</' + stack.pop() + '>';
        popover_content += '</' + stack.pop() + '>';
        break;
      case "user_status":
        stack.push('div');
        stack.push('p');
        popover_content += '<div><p class="user-para">';
        if (user_hashmap[user_item] === true){
          popover_content += '<i class="fas fa-graduation-cap" aria-hidden="true"></i>&nbsp;';
        }
        else{
          popover_content += '<i class="fas fa-building" aria-hidden="true"></i>&nbsp;';
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

function makeSVG(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}