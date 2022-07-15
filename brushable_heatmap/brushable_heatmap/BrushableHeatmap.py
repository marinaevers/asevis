# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class BrushableHeatmap(Component):
    """A BrushableHeatmap component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- data (dict; required)

- fontSize (number; default 12)

- height (number; default 400)

- histLabel (string; optional)

- padding (number; optional)

- redraw (boolean; default True)

- selectedId (number; optional)

- selection (list; optional)

- showPoints (boolean; default True)

- valueLabel (string; optional)

- width (number; default 800):
    Properties for the state of the figure.

- xLabel (string; optional)

- yLabel (string; optional)"""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, width=Component.UNDEFINED, height=Component.UNDEFINED, padding=Component.UNDEFINED, data=Component.REQUIRED, xLabel=Component.UNDEFINED, yLabel=Component.UNDEFINED, valueLabel=Component.UNDEFINED, selectedId=Component.UNDEFINED, selection=Component.UNDEFINED, fontSize=Component.UNDEFINED, showPoints=Component.UNDEFINED, redraw=Component.UNDEFINED, histLabel=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'data', 'fontSize', 'height', 'histLabel', 'padding', 'redraw', 'selectedId', 'selection', 'showPoints', 'valueLabel', 'width', 'xLabel', 'yLabel']
        self._type = 'BrushableHeatmap'
        self._namespace = 'brushable_heatmap'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'data', 'fontSize', 'height', 'histLabel', 'padding', 'redraw', 'selectedId', 'selection', 'showPoints', 'valueLabel', 'width', 'xLabel', 'yLabel']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in ['data']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(BrushableHeatmap, self).__init__(**args)
