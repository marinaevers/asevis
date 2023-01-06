# ASEVis: Active System Ensemble Visualization
*ASEVis* is an interactive visual analysis tool that allows to define user-defined measures
for comparing and analyzing ensemble data in the domain of active systems. The first step
is a bottom-up analysis to understand the data and define suitable measures over time
as well as aggregated over time. In a second step, the top-down analysis can be used to
analyze the whole ensemble and investigate the parameter dependencies.

More information can be found in the paper *ASEVis: Visual Exploration of Active System Ensembles
to Define Characteristic Measures* by Marina Evers, Raphael Wittkowski and Lars Linsen.

If you use our approach, please cite out paper.
> M. Evers, R. Wittkowski and L. Linsen, "ASEVis: Visual Exploration of Active System Ensembles to Define Characteristic Measures," 2022 IEEE Visualization and Visual Analytics (VIS), 2022, pp. 150-154, doi: 10.1109/VIS54862.2022.00039.
```
@INPROCEEDINGS{asevis,
  author={Evers, Marina and Wittkowski, Raphael and Linsen, Lars},
  booktitle={2022 IEEE Visualization and Visual Analytics (VIS)}, 
  title={ASEVis: Visual Exploration of Active System Ensembles to Define Characteristic Measures}, 
  year={2022},
  pages={150-154},
  doi={10.1109/VIS54862.2022.00039}}
```

## Requirements
Create a new virtual environment:
```
python3 -m venv venv
```
Activate the environment:
```
source venv/bin/activate
```
Install the requirements:
```
pip install -r requirements.txt
```
Make the heatmap locally available:
```
pip install brushable_heatmap/
```

## How to run?
We included some example data such that the tool can be executed and tested directly.
In the main folder of the program, execute:
```
python app.py
```
However, it can also be applied to own data. The ensemble data should be placed in a
folder where each subfolder contains a single ensemble member's data. The parameter 
values are taken directly from the folder names following the structure beta-d
for our example. Each folder should contain one file for each particle that contains
the orientation of the particle over time. It further contains a file that stores
the time stamps for the individual particles.

The path to the data is set in the function ``loadData()`` of the file ``datastructure.py``.

## How to use?
### Programming interface
You can implement your measure using Python. You can use the default function for
orientation. Do not change the signature of the function but you can change the
body freely. You can also import further Python packages.

After you implemented the measure you want to use or to test, click ``Compute`` to
update the other views.

### Heatmap
The heatmap shows the result of the aggregated measure definition. \
Hover: Show the exact position of the data point, its value and a histogram representing
the distribution of the measure values for single time steps. \
Shift + Click: Select single run for detail analysis \
Ctrl + Drag: Select cells in the heatmap \
Alt + Click: Desect selected cells

### Animation
Creating the animation might take some time (depending on the number of time steps).
Therefore, the animation is not updated automatically. For updating it manually,
click ``Create animation``.

The animation is started by using the ``Play`` button. Using the icons on the top-right
of the view, it is also possibe to zoom in and out, pan or take a screenshot.

### Line Plot and Timeplot
Using standard plotly visualizations, the default interactions are supported: zooming,
panning, taking screenshots and reseting the view. The dropdown menu above the
timeplot allows to adapt the color coding of the different lines.
