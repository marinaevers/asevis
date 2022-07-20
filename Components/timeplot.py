import plotly.express as px
import pandas as pd
import numpy as np
import plotly.graph_objects as go
from PIL import ImageColor
import plotly

def get_color(colorscale_name, loc):
    from _plotly_utils.basevalidators import ColorscaleValidator
    # first parameter: Name of the property being validated
    # second parameter: a string, doesn't really matter in our use case
    cv = ColorscaleValidator("colorscale", "")
    # colorscale will be a list of lists: [[loc1, "rgb1"], [loc2, "rgb2"], ...]
    colorscale = cv.validate_coerce(colorscale_name)

    if hasattr(loc, "__iter__"):
        return [get_continuous_color(colorscale, x) for x in loc]
    return get_continuous_color(colorscale, loc)


def get_continuous_color(colorscale, intermed):
    """
    Plotly continuous colorscales assign colors to the range [0, 1]. This function computes the intermediate
    color for any value in that range.

    Plotly doesn't make the colorscales directly accessible in a common format.
    Some are ready to use:

        colorscale = plotly.colors.PLOTLY_SCALES["Greens"]

    Others are just swatches that need to be constructed into a colorscale:

        viridis_colors, scale = plotly.colors.convert_colors_to_same_type(plotly.colors.sequential.Viridis)
        colorscale = plotly.colors.make_colorscale(viridis_colors, scale=scale)

    :param colorscale: A plotly continuous colorscale defined with RGB string colors.
    :param intermed: value in the range [0, 1]
    :return: color in rgb string format
    :rtype: str
    """
    if len(colorscale) < 1:
        raise ValueError("colorscale must have at least one color")

    hex_to_rgb = lambda c: "rgb" + str(ImageColor.getcolor(c, "RGB"))

    if intermed <= 0 or len(colorscale) == 1:
        c = colorscale[0][1]
        return c if c[0] != "#" else hex_to_rgb(c)
    if intermed >= 1:
        c = colorscale[-1][1]
        return c if c[0] != "#" else hex_to_rgb(c)

    for cutoff, color in colorscale:
        if intermed > cutoff:
            low_cutoff, low_color = cutoff, color
        else:
            high_cutoff, high_color = cutoff, color
            break

    if (low_color[0] == "#") or (high_color[0] == "#"):
        low_color = hex_to_rgb(low_color)
        high_color = hex_to_rgb(high_color)

    return plotly.colors.find_intermediate_color(
        lowcolor=low_color,
        highcolor=high_color,
        intermed=((intermed - low_cutoff) / (high_cutoff - low_cutoff)),
        colortype="rgb",
    )

def createTimeplot(data, timeRange):
    # Execute code
    if(data.codeMeasurePerTimestep == None):
        return {}
    exec(data.codeMeasurePerTimestep, globals())
    dataDict = {}
    dataDict["Time"] = []
    dataDict[data.nameMeasurePerTimestep] = []
    dataDict["Run"] = []
    dataDict["beta"] = []
    dataDict["d"] = []
    fig = go.Figure()
    for s in data.selectionEnsemble:
        indexRange = (np.where(data.series[s].times > (timeRange[0]))[0][0],
                    np.where(data.series[s].times < timeRange[1])[0][-1] + 1)
        dataDict["Time"] = data.series[s].times[indexRange[0]:indexRange[1]].tolist()
        dataDict[data.nameMeasurePerTimestep] = \
            measurePerTimestep(data.series[s].times[indexRange[0]:indexRange[1]],
                               data.series[s].orientations[:,indexRange[0]:indexRange[1]]).tolist()
        dataDict["Run"]=((indexRange[1]-indexRange[0])*["Beta=" + str(data.series[s].beta) + ", d=" + str(data.series[s].d)])
        if(data.colorTimeplotBy!="Run"):
            if(data.colorTimeplotBy=="d"):
                color_val_normalized = (data.series[s].d - data.minD)/(data.maxD - data.minD)
            else:
                color_val_normalized = (data.series[s].beta - data.minBeta) / (data.maxBeta - data.minBeta)
            fig.add_trace(go.Scatter(x=dataDict["Time"], y=dataDict[data.nameMeasurePerTimestep],
                                 mode='lines', showlegend=False, marker=dict(color=get_color('Plasma', color_val_normalized))))

        else:
            fig.add_trace(go.Scatter(x=dataDict["Time"], y=dataDict[data.nameMeasurePerTimestep],
                                     mode='lines', name=dataDict[data.colorTimeplotBy][0]))

    if(data.colorTimeplotBy=="d"):
        minVal = data.minD
        maxVal = data.maxD
    else:
        minVal = data.minBeta
        maxVal = data.maxBeta
    if(data.colorTimeplotBy!="Run"):
        fig.add_trace(go.Scatter(
            x=dataDict["Time"],
            y=dataDict[data.nameMeasurePerTimestep],
            mode='markers',
            marker=dict(
                size=0,
                color="rgba(0,0,0,0)",
                colorscale='Plasma',
                cmin=minVal,
                cmax=maxVal,
                colorbar=dict(thickness=40, title=data.colorTimeplotBy, ypad = 0)
            ),
            showlegend=False
        ))
    fig.update_layout(template = 'simple_white',
                      margin=dict(
                          l=20,
                          r=20,
                          b=50,
                          t=10,
                          pad=4
                      )
                      )
    fig.update_layout(xaxis_title="Time", yaxis_title=data.nameMeasurePerTimestep)
    return fig
