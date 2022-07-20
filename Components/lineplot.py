import plotly.express as px
import pandas as pd
from datastructure import *


def createLineplot(data, idx, indexRange):
    dataDict = {}
    dataDict["Times"] = []
    dataDict["O"] = []
    dataDict["No"] = []
    # Determine indices that fall into the rang
    for i in range(data.particleNumber):
        dataDict["Times"] += data.series[idx].times[indexRange[0]:indexRange[1]].tolist()
        dataDict["O"] += data.series[idx].orientations[i, indexRange[0]:indexRange[1], 0].tolist()
        dataDict["No"] += (np.ones(indexRange[1] - indexRange[0]) * i).astype(int).tolist()
    df = pd.DataFrame(dataDict)
    lineplot = px.line(df, x="Times", y="O", color="No",
                       labels={"No": "Index", "Times": "t"})
    lineplot.update_layout(template='simple_white',
                           xaxis_title=r'Time', yaxis_title=r'x-Coordinate')
    lineplot.update_layout(font=dict(
        size=data.fontSize
    ))
    return lineplot
