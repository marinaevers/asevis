import plotly.express as px
import pandas as pd
from datastructure import *
from sklearn.decomposition import PCA
import plotly.graph_objects as go


def createSPLOM(data, idx, indexRange, maxComp):
    O = np.transpose(data.series[idx].orientations, (1, 0, 2))[indexRange[0]:indexRange[1]]
    O = O.reshape(O.shape[0], data.particleNumber*3)#[-1000:]
    pca = PCA()
    pca_data = pca.fit_transform(O)
    var = pca.explained_variance_ratio_
    numDim = np.count_nonzero(var > 0.001)
    numDim = min(maxComp, numDim)
    pca_data = pca_data[:,:numDim]
    minVal = np.min(pca_data)-0.2
    maxVal = np.max(pca_data)+0.2
    df = pd.DataFrame(data=pca_data, index=[(""+str(i)) for i in range(len(pca_data))])
    splom = px.scatter_matrix(df,
                              labels={i:(""+str(i)) for i in range(numDim)})
    # splom = go.Figure(data=go.Splom(
    #     dimensions=[dict(label=""+str(i),
    #                      values=df[i]) for i in range(numDim)],
    #     #mode = 'line'
    # ))

    splom.update_traces(diagonal_visible=False)
    splom.update_layout(template = 'simple_white')
    splom.update_layout({"xaxis"+str(i+1): dict(range = [minVal, maxVal]) for i in range(numDim)})
    splom.update_layout({"yaxis"+str(i+1): dict(range = [minVal, maxVal]) for i in range(numDim)})
    splom.update_layout(font=dict(
        size=data.fontSize
    ))
    return splom
