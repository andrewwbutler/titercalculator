<script>
    import { default as vegaEmbed } from "vega-embed";
    export let plotData;
    export let titerMethod;
    let minTiter;
    let maxTiter;
    let groups
    let xAxisTitle;
    let legendSpec;
    let xTicks;

    let spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A plot of titer data",
        "config": {
            "scale": {
              "resolution": 300 // set the DPI to 300
            }
        },
        "mark": {"type": "circle", "size": 175},
        "encoding": {
            "x": {"type": "quantitative", "scale": {"type": "log"}, "axis": {"labelFontSize": 15, "format": "e", "titleFontSize": 15, "titleFontWeight": 'normal', "titlePadding": 15}},
            "y": {"type": "nominal", "axis": {"grid": true, "labelFontSize": 15}, "title": ""},
            "color": {"type": "nominal", "field": "group", "legend": {"labelFontSize": 20, "title": "", "symbolSize": 100}}
        }
    }
    $: {
        maxTiter = 0;
        minTiter = Infinity;
        legendSpec = null;
        console.log(plotData);
        groups = [];
        xTicks = [];
        plotData.forEach(sample => {
            if (sample[titerMethod] < minTiter) {
                minTiter = sample[titerMethod];
            }
            if (sample[titerMethod] > maxTiter) {
                maxTiter = sample[titerMethod];
            }
            if (!groups.includes(sample['group']) & sample['group'] != ' ') {
                groups.push(sample['group']);
            }
        });
        if (groups.length > 0) {
            legendSpec = {"labelFontSize": 20, "title": "", "symbolSize": 100};
        }
        plotData = plotData.sort(
          (sample1, sample2) => {
            if(sample1.group === sample2.group) {
              return sample1.sampleName.localeCompare(sample2.sampleName);
            }
            return sample1.group.localeCompare(sample2.group);
        })
        let samplesSorted = plotData.map(obj => obj.sampleName);
        for (let i = String(minTiter).split(".")[0].length - 2; i < String(maxTiter).split(".")[0].length+1; i++) {
            xTicks = [10**i, ...xTicks]
        };
        xAxisTitle = "TCID50";
        if (titerMethod == "ms_titer_ul") {
          xAxisTitle = "SIN";
        }; 
        spec.width = 'container'
        spec.height = plotData.length * 50 + 100
        spec.encoding.x.field = titerMethod
        spec.encoding.y.field = "sampleName"
        spec.data = { values: plotData }
        spec.encoding.x.axis.title = xAxisTitle + "/\u03BCL"
        spec.encoding.y.sort = samplesSorted
        spec.encoding.color.legend = legendSpec
        spec.encoding.x.scale.domain = [xTicks[xTicks.length - 1], xTicks[0]]
        spec.encoding.x.axis.tickCount = xTicks.length - 2
    }
    $: {
        if ( typeof document !== 'undefined' ) { vegaEmbed('#vis', spec) }
    }
</script>

<div class='vega-plot' id="vis"></div>

<style>
    .vega-plot{
        width: 100%;
        padding-bottom: 30px;
    }
    .vega-embed {
        width: 100%;
    }
</style>