function change_map_fill_color (fill_color) {
  $("svg").attr("fill",fill_color);
}

function change_map_boarder_color (boarder_color) {
  $("svg").attr("stroke",boarder_color);
}

// fill color select
$("#inputGroupSelect01").change(function (selection) {
  change_map_fill_color(selection.target.value);
})

// boarder color select
$("#inputGroupSelect02").change(function (selection) {
  change_map_boarder_color(selection.target.value);
})
