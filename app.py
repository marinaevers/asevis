# -*- coding: utf-8 -*-

# Run this app with `python app.py` and
# visit http://127.0.0.1:8050/ in your web browser.

# import Components.brushable_heatmap.brushable_heatmap as brushable_heatmap
import dash
import dash.dcc as dcc
import dash.html as html

from Components.animation import *
from Components.heatmap import *
from Components.lineplot import *
from Components.splom import *
from Components.timeplot import *
from datastructure import *
import brushable_heatmap as bh

mathjax = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML'
app = dash.Dash(__name__, title="Active Crystals", external_scripts=[
    mathjax
])
# Link: https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML

data = loadData()

minTime = data.minTime
maxTime = min(1000, data.maxTime)
idxStart = np.where(data.series[0].times > (minTime))[0][0]
idxEnd = np.where(data.series[0].times < maxTime)[0][-1] + 1
idxRange = (idxStart, idxEnd)

app.layout = html.Div(children=[
    html.Div([
        html.Div([
            html.Div([
                dcc.Tabs(id='setting-tabs', value='settings', children=[
                    dcc.Tab(label="Settings", value='settings', children=[
                        # Time range slider
                        # html.Div([
                        #     html.H2(children="Time range:")
                        # ]),
                        html.Div([
                            html.H2(children="Time range:"),
                            dcc.RangeSlider(
                                id='time-range-slider',
                                marks={i: str(i) for i in range(int(minTime), int(maxTime), 50)},
                                min=minTime,
                                max=maxTime,
                                step=0.5,
                                value=[minTime, maxTime]
                            ),
                            html.H2(children="Max. number of components (SPLOM):"),
                            dcc.Slider(
                                id='max-comp-slider',
                                marks={i: str(i) for i in range(21)},
                                max=21,
                                step=1,
                                value=10
                            ),
                            dcc.Dropdown(id='run-selection', options=[
                                {'label': str(s.beta) + "-" + str(s.d), 'value': i} for i, s in enumerate(data.series)
                            ], value=[], multi=True),
                            dcc.Dropdown(id='single-run-selection', options=[
                                {'label': str(s.beta) + "-" + str(s.d), 'value': i} for i, s in enumerate(data.series)
                            ], value=0)
                        ])
                    ], className="custom-tab", selected_className="custom-tab--selected"),
                    dcc.Tab(label="Per Timestep", value='per-timestep', children=[
                        # Per-timestep-measure
                        # html.H2(children="Measure per timestep"),
                        html.Div([
                            html.H3(children="Name: ")
                        ], style={'width': '20%', 'display': 'inline-block'}),
                        html.Div([
                            dcc.Input(value='Timewise', id='name-per-timestep', style={'width': '100%'})
                        ], style={'width': '80%', 'display': 'inline-block'}),
                        html.Div([
                            html.H3(children="Code: ")
                        ], style={'width': '20%', 'display': 'inline-block', 'vertical-align': 'top'}),
                        html.Div([
                            dcc.Textarea(
                                value='def measurePerTimestep(times, trajectory):\n  print("Measure not defined yet")\n  return trajectory[0,:,0]',
                                id='code-per-timestep', style={'width': '100%'}, rows=10)
                        ], style={'width': '80%', 'display': 'inline-block'})
                    ], className="custom-tab", selected_className="custom-tab--selected"),
                    dcc.Tab(label="Aggregation", value='aggregation', children=[
                        # Aggregation-measure
                        # html.H2(children="Aggregation over time measure"),
                        html.Div([
                            html.H3(children="Name: ")
                        ], style={'width': '20%', 'display': 'inline-block'}),
                        html.Div([
                            dcc.Input(value='Aggregate', id='name-aggregation', style={'width': '100%'})
                        ], style={'width': '80%', 'display': 'inline-block'}),
                        html.Div([
                            html.H3(children="Code: ")
                        ], style={'width': '20%', 'display': 'inline-block', 'vertical-align': 'top'}),
                        html.Div([
                            dcc.Textarea( # measurePerTimestep(times, trajectory)[0]
                                value='def aggregatedMeasure(times, trajectory):\n  print("Aggregation not defined yet")\n  return times[-1]',
                                id='code-aggregation', style={'width': '100%'}, rows=10)
                        ], style={'width': '80%', 'display': 'inline-block'})
                    ], className="custom-tab", selected_className="custom-tab--selected")
                ]),
                html.Button("Compute", id='compute-button', className="compute-button")
            ], className="box"),
            html.Div([
                # Heatmap tab
                html.H1(children="Heatmap"),
                # brushable_heatmap.BrushableHeatmap(
                #    id='input',
                #    value='my-value',
                #    label='my-label'
                # ),
                # html.Div(id='output')
                # dcc.Graph(
                #   id='heatmap',
                #   figure=createHeatmap(data, idxRange)
                # )
                bh.BrushableHeatmap(
                    data=createHeatmapData(data, idxRange),  # dataTest,#
                    id='heatmap',
                    xLabel='d',
                    yLabel='beta',
                    fontSize=16,
                    valueLabel="Aggregate",
                    width=922
                )
            ], className="box")
        ], className="outer"),
        html.Div([
            html.Div([
                # Single run
                dcc.Tabs(id='single-run-tabs', value='animation', children=[
                    dcc.Tab(label="Animation", value='animation', children=[
                        html.Button("Create animation", id='animate-button', className="compute-button"),
                        dcc.Graph(
                            id='animation',
                            figure=createAnimation(data, 0, idxRange),
                        )
                    ], className="custom-tab", selected_className="custom-tab--selected"),
                    dcc.Tab(label="Line Plot", value='line-plot', children=[
                        dcc.Graph(
                            id='line-plot',
                            figure=createLineplot(data, 0, idxRange)
                        )
                    ], className="custom-tab", selected_className="custom-tab--selected"),
                    dcc.Tab(label="SPLOM", value='splom', children=[
                        dcc.Graph(
                            id='splom',
                            figure=createSPLOM(data, 0, idxRange, 21)
                        )
                    ], className="custom-tab", selected_className="custom-tab--selected")
                ])
            ], className="box"),
            html.Div([
                # Compare runs
                html.H1(children="Timeplot"),
                dcc.Dropdown(id='color-coding-timeplot', options=[
                    {'label': "Run", 'value': "Run"},
                    {'label': "beta", 'value': "beta"},
                    {'label': "d", 'value': "d"}
                ], value="Run"),
                dcc.Graph(
                    id='timeplot',
                    figure=createTimeplot(data, idxRange)
                )
            ], className="box")
        ], className="outer")
    ])
])


@app.callback(
    dash.Output(component_id='heatmap', component_property='data'),
    dash.Output(component_id='heatmap', component_property='valueLabel'),
    dash.Output(component_id='heatmap', component_property='redraw'),
    dash.Input(component_id='compute-button', component_property='n_clicks'),
    dash.State(component_id='name-per-timestep', component_property='value'),
    dash.State(component_id='code-per-timestep', component_property='value'),
    dash.State(component_id='name-aggregation', component_property='value'),
    dash.State(component_id='code-aggregation', component_property='value'),
    dash.State(component_id='time-range-slider', component_property='value'),
    dash.State(component_id='run-selection', component_property='value')
)
def updateHeatmap(n_clicks, nameTimestep, codeTimestep, nameAggregation,
                  codeAggregation, timeRange, selection):
    data.nameMeasurePerTimestep = nameTimestep
    data.nameAggregatedMeasure = nameAggregation
    data.codeAggregatedMeasure = codeAggregation
    data.codeMeasurePerTimestep = codeTimestep
    return createHeatmapData(data, timeRange), nameAggregation, True


@app.callback(
    dash.Output(component_id='timeplot', component_property='figure'),
    dash.Input(component_id='compute-button', component_property='n_clicks'),
    dash.Input(component_id='color-coding-timeplot', component_property='value'),
    dash.State(component_id='name-per-timestep', component_property='value'),
    dash.State(component_id='code-per-timestep', component_property='value'),
    dash.State(component_id='name-aggregation', component_property='value'),
    dash.State(component_id='code-aggregation', component_property='value'),
    dash.State(component_id='time-range-slider', component_property='value'),
    dash.State(component_id='run-selection', component_property='value')
)
def updateTimeplot(n_clicks, colorCoding, nameTimestep, codeTimestep, nameAggregation,
                   codeAggregation, timeRange, selection):
    data.selectionEnsemble = selection
    data.nameMeasurePerTimestep = nameTimestep
    data.nameAggregatedMeasure = nameAggregation
    data.codeAggregatedMeasure = codeAggregation
    data.codeMeasurePerTimestep = codeTimestep
    data.colorTimeplotBy = colorCoding
    return createTimeplot(data, timeRange)


@app.callback(
    dash.Output(component_id='line-plot', component_property='figure'),
    dash.Output(component_id='splom', component_property='figure'),
    dash.Input(component_id='compute-button', component_property='n_clicks'),
    dash.State(component_id='time-range-slider', component_property='value'),
    dash.State(component_id='single-run-selection', component_property='value'),
    dash.State(component_id='max-comp-slider', component_property='value')
)
def updateHeatmapSelection(n_clicks, timeRange, selected, maxComp):
    data.selectedIdx = selected
    data.timeRange = timeRange
    global idxRange
    idxRange = (np.where(data.series[data.selectedIdx].times > (timeRange[0]))[0][0],
                np.where(data.series[data.selectedIdx].times < timeRange[1])[0][-1] + 1)
    return createLineplot(data, selected, idxRange), \
           createSPLOM(data, selected, idxRange, maxComp)

@app.callback(
    dash.Output(component_id='animation', component_property='figure'),
    dash.Input(component_id='animate-button', component_property='n_clicks'),
    dash.State(component_id='time-range-slider', component_property='value'),
    dash.State(component_id='single-run-selection', component_property='value')
)
def updateAnimation(n_clicks, timeRange, selected):
    idxRange = (np.where(data.series[data.selectedIdx].times > (timeRange[0]))[0][0],
                np.where(data.series[data.selectedIdx].times < timeRange[1])[0][-1] + 1)
    return createAnimation(data, selected, idxRange)

@app.callback(
    dash.Output(component_id='single-run-selection', component_property='value'),
    dash.Input(component_id='heatmap', component_property='selectedId')
)
def updateSingleSelection(selected):
    data.selectedIdx = selected
    return selected

@app.callback(
    dash.Output(component_id='run-selection', component_property='value'),
    dash.Input(component_id='heatmap', component_property='selection')
)
def updateMultiSelection(selection):
    data.selectionEnsemble = selection
    return selection

if __name__ == '__main__':
    app.run_server(debug=False)
