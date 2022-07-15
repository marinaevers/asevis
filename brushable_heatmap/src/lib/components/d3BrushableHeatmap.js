// d3Heatmap.js
import * as d3 from 'd3'
import {ifElse} from "ramda";

export default class HeatmapD3 {
    constructor(el, props) {
        this.update = this.update.bind(this);
        this.wrappedClick = this.wrappedClick.bind(this);
        this.props = props

        var margin = {top: 30, right: 100, bottom: 50, left: 50}, width = props.width - margin.left - margin.right,
            height = props.height - margin.top - margin.bottom;

        this.width = width;
        this.height = height;

        d3.select(el).selectAll("*").remove();

        // Add drawing area
        this.svg = d3.select(el).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Add brushing
        var isBrushed = (brush_coords, cx, cy, w, h) => {
            var x0 = brush_coords[0][0], x1 = brush_coords[1][0], y0 = brush_coords[0][1], y1 = brush_coords[1][1]
            // selects if there is an intersection
            var bottomLeftX = Math.max(cx, x0), bottomLeftY = Math.max(cy, y0), topRightX = Math.min(cx + w, x1),
                topRightY = Math.min(cy + h, y1);
            return (bottomLeftX <= topRightX && bottomLeftY <= topRightY);
        };

        var updateBrush = (event) => {
            var extent = event.selection;
            if (extent) {
                var selection = []
                this.cells.style("opacity", function (d) {
                    var w = unitSizeX * (dimensions[d.id][0] + dimensions[d.id][1]);
                    var h = unitSizeY * (dimensions[d.id][2] + dimensions[d.id][3]);
                    if (isBrushed(extent, scaleX(d.x - dimensions[d.id][0]), scaleY(d.y + dimensions[d.id][3]), w, h)) {
                        selection.push(d.id)
                        return 1;
                    } else {
                        return 0.5;
                    }
                })
                props.setProps({selection: selection, redraw: false});
            } else {
                this.cells.style("opacity", 1)
            }
        }

        var g = this.svg.append("g");

        // Draw axes
        var cols = props.data.columns.sort(d3.ascending)
        var rows = props.data.rows.sort(d3.ascending)
        var scaleX = d3.scaleLinear()
            .domain([cols[0], cols[cols.length - 1]])
            .range([0, width])
        this.axX = this.svg.append('g')
            .style("font", props.fontSize + "px times")
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(scaleX));
        this.xLabel = this.axX.append('text')
            .attr('x', 0.5 * width)
            .attr('y', 0.8 * margin.bottom)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", props.fontSize)
            .text(props.xLabel);
        var scaleY = d3.scaleLinear()
            .domain([rows[0], rows[rows.length - 1]])
            .range([height, 0])
        this.axY = this.svg.append('g')
            .style("font", props.fontSize + "px times")
            .call(d3.axisLeft(scaleY));
        this.yLabel = this.axY.append('text')
            .attr("transform", "rotate(-90)")
            .attr('x', -0.5 * height)
            .attr('y', -0.8 * margin.bottom)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .attr("font-size", props.fontSize)
            .text(props.yLabel);

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {
            d3.select(".tooltip").style("opacity", 1);
        }
        var mousemove = function (d, object) {
            var plotWidth = 250;
            var plotHeight = 130;
            var yMaxHist = 0;
            for (let i = 0; i < object.histValues.length; ++i) {
                const val = object.histValues[i][1];
                if (val > yMaxHist) {
                    yMaxHist = val;
                }
            }
            d3.select(".tooltip")
                .html(object.x + "," + object.y + "<br>Value: " + object.value + "<br><div id='tipDistribution'></div>")
                .style("left", (d.pageX + 10) + "px")
                .style("top", (d.pageY + 10) + "px");
            var tooltipSvg = d3.select("#tipDistribution")
                .append("svg")
                .attr("width", plotWidth + 40)
                .attr("height", plotHeight + 40)
            var xBars = d3.scaleBand()
                .range([0, plotWidth])
                .domain(object.histValues.map(function (d) {
                    return d[0];
                }))
                .padding(0.05);
            tooltipSvg.append("g")
                .attr("transform", "translate(30," + plotHeight + ")")
                .call(d3.axisBottom(xBars)
                    .tickValues(xBars.domain().filter(function (d, i) {
                        console.log(d);
                        return !(i % 5)
                    }))
                .tickFormat(function (d) {
                    return d3.format(".2f")(d);
                }))
                .append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "black")
                .attr("x", plotWidth / 2)
                .attr("y", 30)
                .text(props.histLabel);
            var yBars = d3.scaleLinear()
                .domain([0, yMaxHist])
                .range([plotHeight, 0]);
            tooltipSvg.append("g")
                .attr("transform", "translate(30,0)")
                .call(d3.axisLeft(yBars));
            tooltipSvg.selectAll("histBars")
                .data(object.histValues)
                .enter()
                .append("rect")
                .attr("x", function (d) {
                    return xBars(d[0]) + 30
                })
                .attr("y", function (d) {
                    return yBars(d[1])
                })
                .attr("width", xBars.bandwidth())
                .attr("height", function (d) {
                    return plotHeight - yBars(d[1])
                })
                .attr("fill", "#8a8a8a");
        }
        var mouseleave = function (d) {
            d3.select(".tooltip").style("opacity", 0);
        }

        var minValue = props.data.values[0].value
        var maxValue = props.data.values[0].value
        props.data.values.forEach(e => {
            if (e.value < minValue) {
                minValue = e.value
            }
            if (e.value > maxValue) {
                maxValue = e.value
            }
        })

        // Add color scale
        var colorScale = d3.scaleSequential(d3.interpolateViridis)
            .domain([maxValue, minValue])

        // Color bar
        const legendProps = {
            title: props.valueLabel, tickSize: 6, width: 30, height: props.height - margin.top - margin.bottom,// + tickSize,
            marginTop: 0, marginRight: 0, marginBottom: 0,// + tickSize,
            marginLeft: 10, ticks: width / 64
        };

        function ramp(color, n = 256) {
            const canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = n;
            const context = canvas.getContext("2d");
            for (let i = 0; i < n; ++i) {
                context.fillStyle = color(i / (n - 1));
                context.fillRect(0, n - 1 - i, 1, 1);
            }
            return canvas;
        }

        const n = Math.min(colorScale.domain().length, colorScale.range().length)
        let x = colorScale.copy().rangeRound(d3.quantize(d3.interpolate(legendProps.marginTop, legendProps.height - legendProps.marginBottom), n));
        this.svg.append("image")
            .attr("x", width + legendProps.marginLeft)
            .attr("y", legendProps.marginTop)
            .attr("width", legendProps.width - legendProps.marginLeft - legendProps.marginRight)
            .attr("height", legendProps.height - legendProps.marginTop - legendProps.marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr("xlink:href", ramp(colorScale.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
        this.legendTitle = this.svg.append("g")
            .style("font", props.fontSize + "px times")
            .attr("transform", 'translate(' + (width + legendProps.width) + ',0)')
            .call(d3.axisRight(x))
            .call(g => g.select(".domain").remove())
            .append("text")
            .attr("x", -legendProps.width + legendProps.marginLeft)
            .attr("y", -5)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-size", props.fontSize)
            .text(legendProps.title);

        colorScale = d3.scaleSequential(d3.interpolateViridis)
            .domain([minValue, maxValue])

        this.brush = d3.brush()
            .extent([[0, 0], [this.width, this.height]])
            .on("end", updateBrush)
        this.svg.append("g")
            .attr("class", "brush")
            .call(this.brush)

        // draw cells
        //var cellSizeX = calculateSizes(cols);
        //var cellSizeY = calculateSizes(rows);
        var dimensions = calculateDimensions(props.data.values);
        var unitSizeX = width / (cols[cols.length - 1] - cols[0]);
        var unitSizeY = height / (rows[rows.length - 1] - rows[0]);
        this.cells = this.svg.selectAll('.cell')
            .data(props.data.values)
            .enter().append('g')

        var setBrush = (d) => {
            if (d.ctrlKey) {
                const [[cx, cy]] = d3.pointers(d);
                this.brush.move(d3.select(".brush"),
                    [[this.clickX, this.clickY], [cx, cy]]);
            }
        }
        this.cells.append('rect')
            .attr('class', 'cell')
            .attr('width', function (d) {
                return unitSizeX * (dimensions[d.id][0] + dimensions[d.id][1])
            })
            .attr('height', function (d) {
                return unitSizeY * (dimensions[d.id][2] + dimensions[d.id][3])
            })
            .attr('y', function (d) {
                return scaleY(d.y + dimensions[d.id][3])
            })
            .attr('x', function (d) {
                return scaleX(d.x - dimensions[d.id][0])
            })
            .attr('fill', function (d) {
                return colorScale(d.value)
            })
            .attr('value', function (d) {
                return d.value
            })
            .attr('dataID', function (d) {
                return d.id;
            })
            .attr('pointer-events', 'all')
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .on("mousedown", this.wrappedClick)
            .on("mouseup", setBrush)
        if (props.showPoints) {
            this.points = this.cells.append("circle")
                .attr('cx', function (d) {
                    return scaleX(d.x)
                })
                .attr('cy', function (d) {
                    return scaleY(d.y)
                })
                .attr('r', 5)
                .style('fill', 'black')
        }

        d3.select(el)
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("position", "absolute")
    }

    wrappedClick(d, object) {
        if (d.altKey) {
            this.brush.clear(d3.select(".brush"));
        }
        if (d.shiftKey) {
            this.props.setProps({selectedId: object.id, redraw: false});
            this.points.style('fill', function (dd) {
                if (dd.id === object.id) {
                    return "red";
                } else {
                    return "black";
                }
            })
        }
        const [[cx, cy]] = d3.pointers(d);
        this.clickX = cx;
        this.clickY = cy;

    }

    update(props) {
        this.legendTitle
            .text(props.valueLabel);
    }

}

const calculateSizes = (a) => {
    var cellSize = {}
    cellSize[a[0]] = {
        left: 0, right: 0.5 * (a[1] - a[0])
    }
    for (let i = 1; i < a.length - 1; i++) {
        cellSize[a[i]] = {
            left: 0.5 * (a[i] - a[i - 1]), right: 0.5 * (a[i + 1] - a[i])
        }
    }
    cellSize[a[a.length - 1]] = {
        left: 0.5 * (a[a.length - 1] - a[a.length - 2]), right: 0,
    }
    return cellSize;
}

const min = (a, b) => {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

const max = (a, b) => {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

const calculateWidth = (d, data) => {
    var l = 10;
    var r = 10;
    for (let i = 0; i < data.length; i++) {
        var o = data[i]
        if (d.x !== o.x) {
            if (o.x < d.x) {
                l = min(l, (d.x - o.x));
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
}

const calculateHeight = (d, data) => {
    var b = 10;
    var t = 10;
    var maxVal = 0;
    var minVal = 10;
    for (let i = 0; i < data.length; i++) {
        var o = data[i];
        minVal = min(minVal, o.y);
        maxVal = max(maxVal, o.y);
        if (d.y !== o.y && d.x === o.x) {
            if (o.y < d.y) {
                b = min(b, (d.y - o.y));
            } else {
                t = min(t, o.y - d.y);
            }
        }
    }
    if (t === 10) {
        t = (maxVal - d.y) * 2;
    }
    if (b === 10) {
        b = (d.y - minVal) * 2;
    }
    return [0.5 * b, 0.5 * t];
}

const calculateDimensions = (data) => {
    var dims = {};
    for (let i = 0; i < data.length; i++) {
        var d = data[i];
        var l, r, b, t;
        [l, r] = calculateWidth(d, data);
        [b, t] = calculateHeight(d, data);
        dims[d.id] = [l, r, b, t];
    }
    return dims;
}