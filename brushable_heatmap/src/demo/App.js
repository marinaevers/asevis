/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { BrushableHeatmap } from '../lib';

class App extends Component {

    constructor() {
        super();
        this.state = {
            data: {
                rows: [-3, 0, 3],
                columns: [1.1, 1.2, 1.4, 1.5],
                values: [
                    {
                        x: 1.1,
                        y: -3,
                        value: 1,
                        id: 0,
                        histValues: [[0, 2.1234], [1, 3], [2, 5], [3, 7], [4, 2], [7, 6]]
                    },
                    {
                        x: 1.1,
                        y: 0,
                        value: 2,
                        id: 1,
                        histValues: [[0, 2], [1, 6], [2, 5], [3, 7], [4, 2], [5, 6]]
                    },
                    {
                        x: 1.2,
                        y: -3,
                        value: 4,
                        id: 3,
                        histValues: [[0, 2], [1, 4], [2, 5], [3, 7], [4, 2], [5, 6]]
                    },
                    {
                        x: 1.2,
                        y: 0,
                        value: 5,
                        id: 4,
                        histValues: [[0, 2], [1, 2], [2, 5], [3, 7], [4, 2], [5, 6]]
                    },
                    {
                        x: 1.2,
                        y: 3,
                        value: 6,
                        id: 5,
                        histValues: [[0, 2], [1, 1], [2, 5], [3, 7], [4, 2], [5, 6]]
                    },
                    {
                        x: 1.4,
                        y: -3,
                        value: 7,
                        id: 6,
                        histValues: [[0, 2], [1, 6], [2, 5], [3, 7], [4, 2], [5, 6]]
                    },
                    {
                        x: 1.4,
                        y: 0,
                        value: 8,
                        id: 7,
                        histValues: [[0, 2], [1, 5], [2, 5], [3, 7], [4, 2], [5, 6]]
                    },
                    {
                        x: 1.5,
                        y: 0,
                        value: 9,
                        id: 10,
                        histValues: [[0, 2], [1, 4], [2, 5], [3, 7], [4, 2], [5, 6]]
                    },
                    {
                        x: 1.5,
                        y: 3,
                        value: 8,
                        id: 11,
                        histValues: [[0, 2], [1, 6], [2, 5], [3, 7], [4, 2], [5, 6]]
                    }
                ]

            },
            xLabel: 'x-Label',
            yLabel: 'y-Label',
            histLabel: 'delta'
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <BrushableHeatmap
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
