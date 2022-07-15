webpackHotUpdatebrushable_heatmap("main",{

/***/ "./src/lib/components/d3BrushableHeatmap.js":
/*!**************************************************!*\
  !*** ./src/lib/components/d3BrushableHeatmap.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/src/index.js");
!(function webpackMissingModule() { var e = new Error("Cannot find module 'd3fc'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
// d3Heatmap.js


var d3Heatmap = {};

var calculateSizes = function calculateSizes(a) {
  var cellSize = {};
  cellSize[a[0]] = {
    left: 0,
    right: 0.5 * (a[1] - a[0])
  };

  for (var i = 1; i < a.length - 1; i++) {
    cellSize[a[i]] = {
      left: 0.5 * (a[i] - a[i - 1]),
      right: 0.5 * (a[i + 1] - a[i])
    };
  }

  cellSize[a[a.length - 1]] = {
    left: 0.5 * (a[a.length - 1] - a[a.length - 2]),
    right: 0
  };
  return cellSize;
};

d3Heatmap.create = function (el, props) {
  var margin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 50
  },
      width = 600 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;
  var svg = d3__WEBPACK_IMPORTED_MODULE_0__["select"](el).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // Draw axes

  var cols = props.data.columns.sort(d3__WEBPACK_IMPORTED_MODULE_0__["ascending"]);
  var rows = props.data.rows.sort(d3__WEBPACK_IMPORTED_MODULE_0__["ascending"]);
  var scaleX = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([cols[0], cols[cols.length - 1]]).range([0, width]);
  var axX = svg.append('g').attr('transform', 'translate(0,' + height + ')').call(d3__WEBPACK_IMPORTED_MODULE_0__["axisBottom"](scaleX));

  if (props.xLabel) {
    axX.append('text').attr('x', 0.5 * width).attr('y', 0.8 * margin.bottom).attr("text-anchor", "middle").attr("stroke", "black").text(props.xLabel);
  }

  var scaleY = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([rows[0], rows[rows.length - 1]]).range([height, 0]);
  var axY = svg.append('g').call(d3__WEBPACK_IMPORTED_MODULE_0__["axisLeft"](scaleY));

  if (props.yLabel) {
    axY.append('text').attr("transform", "rotate(-90)").attr('x', -0.5 * height).attr('y', -0.8 * margin.bottom).attr("text-anchor", "middle").attr("stroke", "black").text(props.yLabel);
  } // Add tooltip


  var tooltip = d3__WEBPACK_IMPORTED_MODULE_0__["select"](el).append('div').style("opacity", 0).attr("class", "tooltip").style("background-color", "white").style("border", "solid").style("border-width", "2px").style("border-radius", "5px").style("padding", "5px").style("position", "absolute"); // Three function that change the tooltip when user hover / move / leave a cell

  var mouseover = function mouseover(d) {
    tooltip.style("opacity", 1);
  };

  var mousemove = function mousemove(d, object) {
    tooltip.html(object.x + "," + object.y + "<br>Value: " + object.value).style("left", d.pageX + 10 + "px").style("top", d.pageY + 10 + "px");
  };

  var mouseclick = function mouseclick(d) {
    d3__WEBPACK_IMPORTED_MODULE_0__["select"](d.target).style("stroke", "red");
  };

  var mouseleave = function mouseleave(d) {
    tooltip.style("opacity", 0); //d3.select(d.target)
    //    .style("stroke", "none")
  };

  var min = props.data.values[0].value;
  var max = props.data.values[0].value;
  props.data.values.forEach(function (e) {
    if (e.value < min) {
      min = e.value;
    }

    if (e.value > max) {
      max = e.value;
    }
  }); // Add color scale

  var colorScale = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateViridis"]).domain([min, max]).range(["#FFFFFF", "#000000"]); // draw cells

  var cellSizeX = calculateSizes(cols);
  var cellSizeY = calculateSizes(rows);
  var unitSizeX = width / (cols[cols.length - 1] - cols[0]);
  var unitSizeY = height / (rows[rows.length - 1] - rows[0]);
  var cells = svg.selectAll('rect').data(props.data.values).enter().append('g').append('rect').attr('class', 'cell').attr('width', function (d) {
    return unitSizeX * (cellSizeX[d.x].left + cellSizeX[d.x].right);
  }).attr('height', function (d) {
    return unitSizeY * (cellSizeY[d.y].left + cellSizeY[d.y].right);
  }).attr('y', function (d) {
    return scaleY(d.y + cellSizeY[d.y].right);
  }).attr('x', function (d) {
    return scaleX(d.x - cellSizeX[d.x].left);
  }).attr('fill', function (d) {
    return colorScale(d.value);
  }).attr('value', function (d) {
    return d.value;
  }).on("mouseover", mouseover).on("mousemove", mousemove).on("mouseleave", mouseleave).on("click", mouseclick);
  d3Heatmap.update(el, props);
};

d3Heatmap.wrappedClick = function (d) {
  d3Heatmap.onClick(d);
  console.log("Clicked");
};

d3Heatmap.update = function (el) {// Recompute the scales and render the data points
  //var scales = this._scales(el, state.domain);
  //this._drawPoints(el, scales, state.data);
};

d3Heatmap.destroy = function (el) {// Any clean up would go here
  // in this example there is nothing to do
};

/* harmony default export */ __webpack_exports__["default"] = (d3Heatmap);

/***/ })

})
//# sourceMappingURL=dcbfd87-main-wps-hmr.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkY2JmZDg3LW1haW4td3BzLWhtci5qcyIsInNvdXJjZVJvb3QiOiIifQ==