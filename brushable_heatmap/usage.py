import brushable_heatmap
import dash
from dash.dependencies import Input, Output
import dash.html as html

app = dash.Dash(__name__)

data = {'rows': [-3, 0, 3], 'columns': [1.1, 1.2, 1.4, 1.5],
        'values': [
                    {
                        'x': 1.1,
                        'y': -3,
                        'value': 1,
                        'id': 0
                    },
                    {
                        'x': 1.1,
                        'y': 0,
                        'value': 2,
                        'id': 1
                    },
                    {
                        'x': 1.1,
                        'y': 3,
                        'value': 3,
                        'id': 2
                    },
                    {
                        'x': 1.2,
                        'y': -3,
                        'value': 4,
                        'id': 3
                    },
                    {
                        'x': 1.2,
                        'y': 0,
                        'value': 5,
                        'id': 4
                    },
                    {
                        'x': 1.2,
                        'y': 3,
                        'value': 6,
                        'id': 5
                    },
                    {
                        'x': 1.4,
                        'y': -3,
                        'value': 7,
                        'id': 6
                    },
                    {
                        'x': 1.4,
                        'y': 0,
                        'value': 8,
                        'id': 7
                    },
                    {
                        'x': 1.4,
                        'y': 3,
                        'value': 9,
                        'id': 8
                    },
                    {
                        'x': 1.5,
                        'y': -3,
                        'value': 10,
                        'id': 8
                    },
                    {
                        'x': 1.5,
                        'y': 0,
                        'value': 9,
                        'id': 9
                    },
                    {
                        'x': 1.5,
                        'y': 3,
                        'value': 8,
                        'id': 10
                    }
                ]}

app.layout = html.Div([
    brushable_heatmap.BrushableHeatmap(
        data = data,
        id = 'heatmap',
        selectedId=1,
        valueLabel="Initial"
    ),
    html.Div(id='output')
])

@app.callback(Output('output', 'children'),
              [Input('heatmap', 'selection')])
def testCallback(selectedId):
    print(selectedId)
    return "changed to " + str(selectedId)


if __name__ == '__main__':
    app.run_server(debug=True)
