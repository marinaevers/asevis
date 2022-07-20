from datastructure import getPosition
import plotly.graph_objects as go

def getFrame(t, positions, data, idx):
    annotations = []
    for i, p in enumerate(positions):
        head = p + data.series[idx].orientations[i, t]
        annotations.append(go.layout.Annotation(
            x = head[0],
            y = head[1],
            ax = p[0],
            ay = p[1],
            xref='x',
            yref='y',
            axref='x',
            ayref='y',
            text = '',
            showarrow = True,
            arrowhead=3,
            arrowsize=1,
            arrowwidth=3,
        ))
    return annotations

def createAnimation(data, idx, indexRange):
    positions = getPosition(data.series[idx].d)

    frames = [go.Frame(
        layout = go.Layout(annotations=getFrame(i, positions, data, idx))
    ) for i in range(indexRange[0], indexRange[1], 1)]
    fig = go.Figure(frames = frames,
                    layout = go.Layout(
                        updatemenus=[dict(type="buttons",
                                          buttons=[dict(label="Play",
                                                        method="animate",
                                                        args=[None, {"frame": {"duration": 0, "redraw": False}}])])],
                        annotations=getFrame(0, positions, data, idx),
                        template = 'simple_white',
                        xaxis = {"visible" : False},
                        yaxis = {"visible" : False}
                    ))
    fig.update_yaxes(
        scaleanchor="x",
        scaleratio=1,
    )
    fig.update_layout(transition = {'duration': 0},
                      margin=dict(
                          l=20,
                          r=20,
                          b=50,
                          t=10,
                          pad=4
                      ))
    for p in positions:
        fig.add_shape(type="circle",
                      xref="x", yref="y",
                      x0=p[0]-1, y0=p[1]-1, x1=p[0]+1, y1=p[1]+1,
                      line_color="black",
                      )


    return fig
