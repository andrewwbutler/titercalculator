<script>
  import { LayerCake, Svg, Html, Canvas } from 'layercake';
  import { scaleLog, scalePoint, scaleOrdinal } from 'd3-scale';
  import AxisX from '../shared/plotting/AxisX.svelte';
  import AxisY from '../shared/plotting/AxisY.svelte';
  import Line from '../shared/plotting/Line.svg.svelte';
  import Scatter from '../shared/plotting/Scatter.svg.svelte';
  import Labels from '../shared/plotting/Labels.svelte';
  import Key from '../shared/plotting/Key.html.svelte';
  export let plotData;
  export let titerMethod;
  const yKey = 'sampleName';
  const zKey = 'group';
  const pointColors = ['#56B4E9', '#E69F00', '#009E73', '#F0E442', '#0072B2','#D55E00', '#CC79A7', '#000000'];
  let minTiter;
  let maxTiter;
  let xTicks;
  let xDomain;
  let xKey;
  let xAxisTitle;
  let groups;
  let includeKey;

  $: plotHeight = plotData.length * 50 + 100;
  $: ylabs = plotData.map(d => d.sampleName);

  $: {
    xTicks = [];
    xKey = titerMethod;
    maxTiter = 0;
    minTiter = Infinity;
    groups = [];
    plotData.forEach(sample => {
      if (sample[titerMethod] < minTiter) {
        minTiter = sample[titerMethod];
      }
      if (sample[titerMethod] > maxTiter) {
        maxTiter = sample[titerMethod];
      }
      if (!groups.includes(sample['group']) & sample['group'] != ' ') {
        groups.push(sample['group']);
      };
    })
    includeKey = groups.length > 0 ? true : false;
    plotData = plotData.sort(
      (sample1, sample2) => {
        if(sample1.group === sample2.group) {
          return sample1.sampleName.localeCompare(sample2.sampleName);
        }
        return sample1.group.localeCompare(sample2.group);
    })
    for (let i = String(minTiter).split(".")[0].length - 2; i < String(maxTiter).split(".")[0].length+1; i++) {
      xTicks = [10**i, ...xTicks]
    };
    xTicks = xTicks.reverse();
    xDomain = [xTicks[0], xTicks[xTicks.length-1]];
    xAxisTitle = "TCID50";
    if (titerMethod == "ms_titer_ul") {
      xAxisTitle = "SIN";
    };
  };

</script>

<div class="grid-container grid grid-cols-6">
  {#if includeKey}
    <div class="chart-container col-span-5" style="height: {plotHeight}px">
      <LayerCake
        x={xKey}
        y={yKey}
        z={zKey}
        yScale={scalePoint()}
        yDomain={ylabs}
        xScale={scaleLog()}
        xDomain={xDomain}
        zScale={scaleOrdinal()}
        zRange={pointColors}
        data={plotData}
      >
        <Svg>
          <AxisX
            ticks={xTicks}
            formatTick={d => "1e" + Math.log10(d)}
            xAxisTitle='{xAxisTitle}/&#181;L'
          />
          <AxisY
        />
        </Svg>
        <Svg>
          <Scatter 
          r=6.5
          />
        </Svg>
      </LayerCake>
    </div>
  {:else}
    <div class="chart-container col-span-6" style="height: {plotHeight}px">
      <LayerCake
        x={xKey}
        y={yKey}
        z={zKey}
        yScale={scalePoint()}
        yDomain={ylabs}
        xScale={scaleLog()}
        xDomain={xDomain}
        zScale={scaleOrdinal()}
        zRange={pointColors}
        data={plotData}
      >
        <Svg>
          <AxisX
            ticks={xTicks}
            formatTick={d => "1e" + Math.log10(d)}
            xAxisTitle='{xAxisTitle}/&#181;L'
          />
          <AxisY
        />
        </Svg>
        <Svg>
          <Scatter 
          r=6.5
          />
        </Svg>
      </LayerCake>
    </div>
  {/if}

  {#if includeKey}
    <div class="col-span-1">
         <LayerCake
          z={zKey}
          zScale={scaleOrdinal()}
          zRange={pointColors}
          data={plotData}
        >
         <Key
            align='center'
            shape='circle'
          />
        </LayerCake>
    </div>
  {/if}
</div>

<style>
  .chart-container {
    padding-bottom: 100px;
    margin-left:1em;
  }
</style>