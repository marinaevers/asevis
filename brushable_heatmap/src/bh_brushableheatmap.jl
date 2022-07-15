# AUTO GENERATED FILE - DO NOT EDIT

export bh_brushableheatmap

"""
    bh_brushableheatmap(;kwargs...)

A BrushableHeatmap component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `width` (Real; optional): Properties for the state of the figure
- `height` (Real; optional)
- `padding` (Real; optional)
- `data` (Dict; required)
- `xLabel` (String; optional)
- `yLabel` (String; optional)
- `valueLabel` (String; optional)
- `selectedId` (Real; optional)
- `selection` (Array; optional)
- `fontSize` (Real; optional)
- `showPoints` (Bool; optional)
- `redraw` (Bool; optional)
- `histLabel` (String; optional)
"""
function bh_brushableheatmap(; kwargs...)
        available_props = Symbol[:id, :width, :height, :padding, :data, :xLabel, :yLabel, :valueLabel, :selectedId, :selection, :fontSize, :showPoints, :redraw, :histLabel]
        wild_props = Symbol[]
        return Component("bh_brushableheatmap", "BrushableHeatmap", "brushable_heatmap", available_props, wild_props; kwargs...)
end

