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
- `data` (Dict; required)
- `fontSize` (Real; optional)
- `height` (Real; optional)
- `histLabel` (String; optional)
- `padding` (Real; optional)
- `redraw` (Bool; optional)
- `selectedId` (Real; optional)
- `selection` (Array; optional)
- `showPoints` (Bool; optional)
- `valueLabel` (String; optional)
- `width` (Real; optional): Properties for the state of the figure
- `xLabel` (String; optional)
- `yLabel` (String; optional)
"""
function bh_brushableheatmap(; kwargs...)
        available_props = Symbol[:id, :data, :fontSize, :height, :histLabel, :padding, :redraw, :selectedId, :selection, :showPoints, :valueLabel, :width, :xLabel, :yLabel]
        wild_props = Symbol[]
        return Component("bh_brushableheatmap", "BrushableHeatmap", "brushable_heatmap", available_props, wild_props; kwargs...)
end

