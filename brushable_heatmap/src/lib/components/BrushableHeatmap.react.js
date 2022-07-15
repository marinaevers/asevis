import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HeatmapD3 from './d3BrushableHeatmap'

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class BrushableHeatmap extends Component {

    componentDidMount() {
        this.heatmap = new HeatmapD3(this.el, this.props);
    }

    componentDidUpdate() {
        if(this.props.redraw) {
            this.heatmap = new HeatmapD3(this.el, this.props);
        }
        else {
            this.heatmap.update(this.props);
        }
    }


    render() {
        return <div id={this.props.id} ref={el => {this.el = el}} />;
    }
}

BrushableHeatmap.defaultProps = {
    width: 800,
    height: 400,
    fontSize: 12,
    showPoints: true,
    redraw: true
};

BrushableHeatmap.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * Properties for the state of the figure
     */
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.number,
    data: PropTypes.object.isRequired,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    valueLabel: PropTypes.string,
    selectedId: PropTypes.number,
    selection: PropTypes.array,
    fontSize: PropTypes.number,
    showPoints: PropTypes.bool,
    redraw: PropTypes.bool,
    histLabel: PropTypes.string
};
