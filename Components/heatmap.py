#import plotly.express as px
import numpy as np
import plotly.graph_objects as go

def createHeatmap(data, timeRange):
    # Execute code
    if(data.codeMeasurePerTimestep == None or data.codeAggregatedMeasure == None):
        return {}
    exec(data.codeMeasurePerTimestep, globals())
    exec(data.codeAggregatedMeasure, globals())

    betas = []
    ds = []
    result = {}
    for s in data.series:
        if(s.times[-1] < timeRange[0] or s.times[0] > timeRange[1]):
            continue
        indexRange = (np.where(s.times>(timeRange[0]))[0][0], np.where(s.times<timeRange[1])[0][-1]+1)
        betas += [s.beta]
        ds += [s.d]
        res = aggregatedMeasure(s.times[indexRange[0]:indexRange[1]],
                                s.orientations[:,indexRange[0]:indexRange[1]])
        if(s.beta in result):
            result[s.beta][s.d] = res
        else:
            result[s.beta] = {s.d : res}
    frequencies = np.zeros((len(np.unique(ds)), len(np.unique(betas))))

    for i, beta in enumerate(sorted(result)):
        for j, d in enumerate(sorted(result[beta])):
            frequencies[j, i]=result[beta][d]

    frequencies[frequencies==0] = np.nan

    fig = go.Figure(data=go.Scatter(
        x = ds,
        y=betas,
        mode='markers',
        marker=dict(opacity=0.0)
    ))

    fig.add_trace(go.Heatmap(
        x = sorted(np.unique(ds)),
        y = sorted(np.unique(betas)),
        z = frequencies,
        type='heatmap',
        colorbar=dict(title=data.nameAggregatedMeasure),
        hoverongaps=False
    ))

    fig.update_layout(
        xaxis_title="Time",
        yaxis_title="d",
        template = 'simple_white'
    )

    return fig

def createHeatmapData(data, timeRange):
    # Execute code
    if not (data.codeMeasurePerTimestep == None or data.codeAggregatedMeasure == None):
    #    return {'rows':[0], 'columns':[0], 'values':[{'x':0,'y':0,'value':0, 'id':0}]}
        exec(data.codeMeasurePerTimestep, globals())
        exec(data.codeAggregatedMeasure, globals())

    betas = []
    ds = []
    result = {}
    result['values'] = []
    for id, s in enumerate(data.series):
        if (s.times[-1] < timeRange[0] or s.times[0] > timeRange[1]):
            continue
        indexRange = (np.where(s.times > (timeRange[0]))[0][0], np.where(s.times < timeRange[1])[0][-1] + 1)
        betas += [s.beta]
        ds += [s.d]
        histValues = [[0, 2], [1, 1], [2, 5], [3, 7], [4, 2], [5, 6]]
        if (data.codeMeasurePerTimestep == None or data.codeAggregatedMeasure == None):
            res = s.times[-1]
        else:
            res = aggregatedMeasure(s.times[indexRange[0]:indexRange[1]],
                                s.orientations[:, indexRange[0]:indexRange[1]])
            timeVarying = measurePerTimestep(s.times[indexRange[0]:indexRange[1]],
                               s.orientations[:,indexRange[0]:indexRange[1]]).tolist()
            hist = np.histogram(timeVarying, bins=21, density=True)
            print(len(hist[1]))
            print(len(hist[0]))
            xHist = [(hist[1][i]+hist[1][i+1])/2 for i in range(len(hist[1])-1)]
            sorting = np.argsort(xHist)
            histValues = np.array(list(zip(xHist, hist[0])))[sorting]
            print(histValues)
        result['values'].append({
            'x': s.d,
            'y': s.beta,
            'value': res,
            'id': id,
            'histValues': histValues
        })

    result['rows'] = np.unique(betas).tolist()
    result['columns'] = np.unique(ds).tolist()
    result['histLabel'] = data.nameMeasurePerTimestep
    return result