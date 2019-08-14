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
  createCircle(mouse_x-svg_x, mouse_y-svg_y, context);
  var cn_code = click.target.id;
  $("#"+cn_code).toggleClass("selected", true);

  // var start_x = mouse_x-svg_x;
  // var start_y = mouse_y-svg_y;
  // console.log(start_x, start_y);
  // displayStudentsList(start_x, start_y, start_x+200, start_y+150);
})

var createCircle = function(x, y, context) {
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


var displayStudentsList = function(start_x, start_y, end_x, end_y) {
  // console.log("plotting lines");
  var sx = Math.round(Number(start_x));
  var sy = Math.round(Number(start_y));
  var ex = Math.round(Number(end_x));
  var ey = Math.round(Number(end_y));
  var mx = sx;
  var my = sy;

  var leading_line_1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  var leading_line_2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  document.getElementById("china-map").appendChild(leading_line_1);
  document.getElementById("china-map").appendChild(leading_line_2);

  leading_line_1.setAttribute("class", "leading_line");
  leading_line_2.setAttribute("class", "leading_line");
  var plotting_flag = 1;
  var delta_length = 1;
  var context_line_attr = {
    "stroke": "black",
    "stroke-width": 2,
  }

  for (var k in context_line_attr) {
    leading_line_1.setAttribute(k, context_line_attr[k]);
    leading_line_2.setAttribute(k, context_line_attr[k]);
  }

  var s = setInterval(function() {
    // console.log(mx, my);
    if (plotting_flag == 1) {
      mx += delta_length;
      my += delta_length;
      context = {
        x1: sx,
        y1: sy,
        x2: mx,
        y2: my,
      }
      for (var k in context) {
        leading_line_1.setAttribute(k, context[k]);
      }
    }
    else {
      if (mx == ex && my == ey) {
        // console.log("interval is blocking");
        window.clearInterval(s);
        // console.log("successfully blocked out");
      }
      else {
        mx = (my == ey) ? mx + delta_length : mx;
        // my = (mx == ex) ? my + delta_length : my;
      }

      context = {
        x1: sx,
        y1: sy,
        x2: mx,
        y2: my,
      }
      for (var k in context) {
        leading_line_2.setAttribute(k, context[k]);
      }
    }

    if (plotting_flag == 1 && my == ey) {
      plotting_flag = 2;
      sx = mx;
      sy = my;
      // console.log("redirecting line");
    }
  }, 1);
  
}