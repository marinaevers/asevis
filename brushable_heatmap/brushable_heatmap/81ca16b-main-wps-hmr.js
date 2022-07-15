webpackHotUpdatebrushable_heatmap("main",{

/***/ "./src/lib/components/d3BrushableHeatmap.js":
/*!**************************************************!*\
  !*** ./src/lib/components/d3BrushableHeatmap.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeatmapD3; });
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3 */ "./node_modules/d3/src/index.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// d3Heatmap.js


var HeatmapD3 = /*#__PURE__*/function () {
  function HeatmapD3(el, props) {
    var _this = this;

    _classCallCheck(this, HeatmapD3);

    this.update = this.update.bind(this);
    this.wrappedClick = this.wrappedClick.bind(this);
    this.props = props;
    var margin = {
      top: 30,
      right: 100,
      bottom: 50,
      left: 50
    },
        width = props.width - margin.left - margin.right,
        height = props.height - margin.top - margin.bottom;
    this.width = width;
    this.height = height; // Add drawing area

    this.svg = d3__WEBPACK_IMPORTED_MODULE_0__["select"](el).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // Add brushing

    var isBrushed = function isBrushed(brush_coords, cx, cy, w, h) {
      var x0 = brush_coords[0][0],
          x1 = brush_coords[1][0],
          y0 = brush_coords[0][1],
          y1 = brush_coords[1][1]; // selects if there is an intersection

      var bottomLeftX = Math.max(cx, x0),
          bottomLeftY = Math.max(cy, y0),
          topRightX = Math.min(cx + w, x1),
          topRightY = Math.min(cy + h, y1);
      return bottomLeftX <= topRightX && bottomLeftY <= topRightY;
    };

    var updateBrush = function updateBrush(event) {
      var extent = event.selection;

      if (extent) {
        var selection = [];

        _this.cells.style("opacity", function (d) {
          var w = unitSizeX * (cellSizeX[d.x].left + cellSizeX[d.x].right);
          var h = unitSizeY * (cellSizeY[d.y].left + cellSizeY[d.y].right);

          if (isBrushed(extent, scaleX(d.x - cellSizeX[d.x].left), scaleY(d.y + cellSizeY[d.y].right), w, h)) {
            selection.push(d.id);
            return 1;
          } else {
            return 0.5;
          }
        });

        props.setProps({
          selection: selection
        });
      } else {
        _this.cells.style("opacity", 1);
      }
    }; // Draw axes


    var cols = props.data.columns.sort(d3__WEBPACK_IMPORTED_MODULE_0__["ascending"]);
    var rows = props.data.rows.sort(d3__WEBPACK_IMPORTED_MODULE_0__["ascending"]);
    var scaleX = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([cols[0], cols[cols.length - 1]]).range([0, width]);
    this.axX = this.svg.append('g').style("font", props.fontSize + "px times").attr('transform', 'translate(0,' + height + ')').call(d3__WEBPACK_IMPORTED_MODULE_0__["axisBottom"](scaleX));
    this.xLabel = this.axX.append('text').attr('x', 0.5 * width).attr('y', 0.8 * margin.bottom).attr("text-anchor", "middle").attr("fill", "black").attr("font-size", props.fontSize).text(props.xLabel);
    var scaleY = d3__WEBPACK_IMPORTED_MODULE_0__["scaleLinear"]().domain([rows[0], rows[rows.length - 1]]).range([height, 0]);
    this.axY = this.svg.append('g').style("font", props.fontSize + "px times").call(d3__WEBPACK_IMPORTED_MODULE_0__["axisLeft"](scaleY));
    this.yLabel = this.axY.append('text').attr("transform", "rotate(-90)").attr('x', -0.5 * height).attr('y', -0.8 * margin.bottom).attr("text-anchor", "middle").attr("fill", "black").attr("font-size", props.fontSize).text(props.yLabel); // Three function that change the tooltip when user hover / move / leave a cell

    var mouseover = function mouseover(d) {
      d3__WEBPACK_IMPORTED_MODULE_0__["select"](".tooltip").style("opacity", 1);
    };

    var mousemove = function mousemove(d, object) {
      d3__WEBPACK_IMPORTED_MODULE_0__["select"](".tooltip").html(object.x + "," + object.y + "<br>Value: " + object.value).style("left", d.pageX + 10 + "px").style("top", d.pageY + 10 + "px");
    };

    var mouseleave = function mouseleave(d) {
      d3__WEBPACK_IMPORTED_MODULE_0__["select"](".tooltip").style("opacity", 0);
    };

    var minValue = props.data.values[0].value;
    var maxValue = props.data.values[0].value;
    props.data.values.forEach(function (e) {
      if (e.value < minValue) {
        minValue = e.value;
      }

      if (e.value > maxValue) {
        maxValue = e.value;
      }
    }); // Add color scale

    var colorScale = d3__WEBPACK_IMPORTED_MODULE_0__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateViridis"]).domain([maxValue, minValue]); // Color bar

    var legendProps = {
      title: props.valueLabel,
      tickSize: 6,
      width: 30,
      height: props.height - margin.top - margin.bottom,
      // + tickSize,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      // + tickSize,
      marginLeft: 10,
      ticks: width / 64
    };

    function ramp(color) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
      var canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = n;
      var context = canvas.getContext("2d");

      for (var i = 0; i < n; ++i) {
        context.fillStyle = color(i / (n - 1));
        context.fillRect(0, n - 1 - i, 1, 1);
      }

      return canvas;
    }

    var n = Math.min(colorScale.domain().length, colorScale.range().length);
    var x = colorScale.copy().rangeRound(d3__WEBPACK_IMPORTED_MODULE_0__["quantize"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolate"](legendProps.marginTop, legendProps.height - legendProps.marginBottom), n));
    this.svg.append("image").attr("x", width + legendProps.marginLeft).attr("y", legendProps.marginTop).attr("width", legendProps.width - legendProps.marginLeft - legendProps.marginRight).attr("height", legendProps.height - legendProps.marginTop - legendProps.marginBottom).attr("preserveAspectRatio", "none").attr("xlink:href", ramp(colorScale.copy().domain(d3__WEBPACK_IMPORTED_MODULE_0__["quantize"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolate"](0, 1), n))).toDataURL());
    this.legendTitle = this.svg.append("g").style("font", props.fontSize + "px times").attr("transform", 'translate(' + (width + legendProps.width) + ',0)').call(d3__WEBPACK_IMPORTED_MODULE_0__["axisRight"](x)).call(function (g) {
      return g.select(".domain").remove();
    }).append("text").attr("x", -legendProps.width + legendProps.marginLeft).attr("y", -5).attr("fill", "black").attr("text-anchor", "start").attr("font-size", props.fontSize).text(legendProps.title);
    colorScale = d3__WEBPACK_IMPORTED_MODULE_0__["scaleSequential"](d3__WEBPACK_IMPORTED_MODULE_0__["interpolateViridis"]).domain([minValue, maxValue]);
    this.brush = d3__WEBPACK_IMPORTED_MODULE_0__["brush"]().extent([[0, 0], [this.width, this.height]]).on("end", updateBrush);
    this.svg.append("g").attr("class", "brush").call(this.brush); // draw cells
    //var cellSizeX = calculateSizes(cols);
    //var cellSizeY = calculateSizes(rows);

    var dimensions = calculateDimensions(props.data.values);
    var unitSizeX = width / (cols[cols.length - 1] - cols[0]);
    var unitSizeY = height / (rows[rows.length - 1] - rows[0]);
    this.cells = this.svg.selectAll('.cell').data(props.data.values).enter().append('g');

    var setBrush = function setBrush(d) {
      if (d.ctrlKey) {
        var _d3$pointers = d3__WEBPACK_IMPORTED_MODULE_0__["pointers"](d),
            _d3$pointers2 = _slicedToArray(_d3$pointers, 1),
            _d3$pointers2$ = _slicedToArray(_d3$pointers2[0], 2),
            cx = _d3$pointers2$[0],
            cy = _d3$pointers2$[1];

        _this.brush.move(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".brush"), [[_this.clickX, _this.clickY], [cx, cy]]);
      }
    };

    console.log(dimensions[0]);
    this.cells.append('rect').attr('class', 'cell').attr('width', function (d) {
      return unitSizeX * (dimensions[d.id][0] + dimensions[d.id][1]);
    }).attr('height', function (d) {
      return unitSizeY * (dimensions[d.id][2] + dimensions[d.id][3]);
    }).attr('y', function (d) {
      return scaleY(d.y + dimensions[d.id][3]);
    }).attr('x', function (d) {
      return scaleX(d.x - dimensions[d.id][0]);
    }).attr('fill', function (d) {
      return colorScale(d.value);
    }).attr('value', function (d) {
      return d.value;
    }).attr('dataID', function (d) {
      return d.id;
    }).attr('pointer-events', 'all').on("mouseover", mouseover).on("mousemove", mousemove).on("mouseleave", mouseleave).on("mousedown", this.wrappedClick).on("mouseup", setBrush);

    if (props.showPoints) {
      this.points = this.cells.append("circle").attr('cx', function (d) {
        return scaleX(d.x);
      }).attr('cy', function (d) {
        return scaleY(d.y);
      }).attr('r', 5).style('fill', 'black');
    }

    d3__WEBPACK_IMPORTED_MODULE_0__["select"](el).append("div").style("opacity", 0).attr("class", "tooltip").style("background-color", "white").style("border", "solid").style("border-width", "2px").style("border-radius", "5px").style("padding", "5px").style("position", "absolute");
  }

  _createClass(HeatmapD3, [{
    key: "wrappedClick",
    value: function wrappedClick(d, object) {
      if (d.altKey) {
        this.brush.clear(d3__WEBPACK_IMPORTED_MODULE_0__["select"](".brush"));
      }

      if (d.shiftKey) {
        this.props.setProps({
          selectedId: object.id
        });
        this.points.style('fill', function (dd) {
          if (dd.id === object.id) {
            return "red";
          } else {
            return "black";
          }
        });
      }

      var _d3$pointers3 = d3__WEBPACK_IMPORTED_MODULE_0__["pointers"](d),
          _d3$pointers4 = _slicedToArray(_d3$pointers3, 1),
          _d3$pointers4$ = _slicedToArray(_d3$pointers4[0], 2),
          cx = _d3$pointers4$[0],
          cy = _d3$pointers4$[1];

      this.clickX = cx;
      this.clickY = cy;
    }
  }, {
    key: "update",
    value: function update(props) {
      this.legendTitle.text(props.valueLabel);
    }
  }]);

  return HeatmapD3;
}();



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

var min = function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
};

var calculateWidth = function calculateWidth(d, data) {
  var l = 10;
  var r = 10;

  for (var i = 0; i < data.length; i++) {
    var o = data[i];

    if (d.x !== o.x) {
      if (o.x < d.x) {
        l = min(l, d.x - o.x);
      } else {
        r = min(r, o.x - d.x);
      }
    }
  }

  if (l === 10) {
    l = 0;
  }

  if (r === 10) {
    r = 0;
  }

  return [0.5 * l, 0.5 * r];
};

var calculateHeight = function calculateHeight(d, data) {
  var b = 10;
  var t = 10;

  for (var i = 0; i < data.length; i++) {
    var o = data[i];

    if (d.y !== o.y) {
      if (o.y < d.y) {
        b = min(b, d.y - o.y);
      } else {
        t = min(t, o.y - d.y);
      }
    }
  }

  if (t === 10) {
    t = 0;
  }

  if (b === 10) {
    b = 0;
  }

  return [0.5 * b, 0.5 * t];
};

var calculateDimensions = function calculateDimensions(data) {
  var dims = {};

  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var l, r, b, t;

    var _calculateWidth = calculateWidth(d, data);

    var _calculateWidth2 = _slicedToArray(_calculateWidth, 2);

    l = _calculateWidth2[0];
    r = _calculateWidth2[1];

    var _calculateHeight = calculateHeight(d, data);

    var _calculateHeight2 = _slicedToArray(_calculateHeight, 2);

    b = _calculateHeight2[0];
    t = _calculateHeight2[1];
    dims[d.id] = [l, r, b, t];
  }

  return dims;
};

/***/ })

})
//# sourceMappingURL=81ca16b-main-wps-hmr.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiI4MWNhMTZiLW1haW4td3BzLWhtci5qcyIsInNvdXJjZVJvb3QiOiIifQ==