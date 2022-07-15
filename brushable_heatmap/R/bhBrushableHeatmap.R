# AUTO GENERATED FILE - DO NOT EDIT

bhBrushableHeatmap <- function(id=NULL, data=NULL, fontSize=NULL, height=NULL, histLabel=NULL, padding=NULL, redraw=NULL, selectedId=NULL, selection=NULL, showPoints=NULL, valueLabel=NULL, width=NULL, xLabel=NULL, yLabel=NULL) {
    
    props <- list(id=id, data=data, fontSize=fontSize, height=height, histLabel=histLabel, padding=padding, redraw=redraw, selectedId=selectedId, selection=selection, showPoints=showPoints, valueLabel=valueLabel, width=width, xLabel=xLabel, yLabel=yLabel)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'BrushableHeatmap',
        namespace = 'brushable_heatmap',
        propNames = c('id', 'data', 'fontSize', 'height', 'histLabel', 'padding', 'redraw', 'selectedId', 'selection', 'showPoints', 'valueLabel', 'width', 'xLabel', 'yLabel'),
        package = 'brushableHeatmap'
        )

    structure(component, class = c('dash_component', 'list'))
}
