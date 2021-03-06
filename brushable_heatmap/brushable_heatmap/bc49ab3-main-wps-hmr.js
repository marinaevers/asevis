webpackHotUpdatebrushable_heatmap("main",{

/***/ "./src/lib/components/BrushableHeatmap.react.js":
/*!******************************************************!*\
  !*** ./src/lib/components/BrushableHeatmap.react.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BrushableHeatmap; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _d3BrushableHeatmap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./d3BrushableHeatmap */ "./src/lib/components/d3BrushableHeatmap.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */

var BrushableHeatmap = /*#__PURE__*/function (_Component) {
  _inherits(BrushableHeatmap, _Component);

  var _super = _createSuper(BrushableHeatmap);

  function BrushableHeatmap() {
    _classCallCheck(this, BrushableHeatmap);

    return _super.apply(this, arguments);
  }

  _createClass(BrushableHeatmap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _d3BrushableHeatmap__WEBPACK_IMPORTED_MODULE_2__["default"].create(this.el, this.props.figure);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          id = _this$props.id,
          label = _this$props.label,
          setProps = _this$props.setProps,
          value = _this$props.value;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: id
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Test"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: this.props.id,
        ref: function ref(el) {
          _this.el = el;
        }
      }));
    }
  }]);

  return BrushableHeatmap;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


BrushableHeatmap.defaultProps = {};
BrushableHeatmap.propTypes = {
  /**
   * The ID used to identify this component in Dash callbacks.
   */
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * A label that will be printed when this component is rendered.
   */
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,

  /**
   * The value displayed in the input.
   */
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,

  /**
   * Dash-assigned callback that should be called to report property changes
   * to Dash, to make them available for callbacks.
   */
  setProps: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};

/***/ }),

/***/ "./src/lib/components/d3BrushableHeatmap.js":
/*!**************************************************!*\
  !*** ./src/lib/components/d3BrushableHeatmap.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
!(function webpackMissingModule() { var e = new Error("Cannot find module 'd3'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
// d3Heatmap.js

var d3Heatmap = {};

d3Heatmap.create = function (el, props) {
  var svg = !(function webpackMissingModule() { var e = new Error("Cannot find module 'd3'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(el).append('svg');
  svg.append('g').attr('class', 'd3-points'); //Create line element inside SVG

  /**svg.append("line")
     .attr("x1", 100)
     .attr("x2", 500)
     .attr("y1", 50)
     .attr("y2", 50)
     .attr("stroke", "black")**/

  d3Heatmap.update(el, props);
};

d3Heatmap.update = function (el) {// Recompute the scales and render the data points
  //var scales = this._scales(el, state.domain);
  //this._drawPoints(el, scales, state.data);
};

d3Heatmap.destroy = function (el) {// Any clean up would go here
  // in this example there is nothing to do
};

d3Heatmap._drawPoints = function (e1, scales, data) {
  var g = !(function webpackMissingModule() { var e = new Error("Cannot find module 'd3'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(e1).selectAll('.d3-points');
  var point = g.selectAll('.d3-point').data(data, function (d) {
    return d.id;
  }); // ENTER

  point.enter().append('circle').attr('class', 'd3-point'); // Enter & UPDATE

  point.attr('cx', function (d) {
    return scales.x(d.x);
  }).attr('cy', function (d) {
    return scales.y(d.y);
  }).attr('r', function (d) {
    return scales.z(d.z);
  }); // EXIT

  point.exit().remove();
};

/* harmony default export */ __webpack_exports__["default"] = (d3Heatmap);

/***/ })

})
//# sourceMappingURL=bc49ab3-main-wps-hmr.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiYzQ5YWIzLW1haW4td3BzLWhtci5qcyIsInNvdXJjZVJvb3QiOiIifQ==