<script>

	import { ComputeTiters }  from '../scripts/Utils.js';
	import { PlateStore, volume, dilution }  from '../stores/PlateStore.js';
	import TiterTable from './TiterTable.svelte';
	import Button from '../shared/Button.svelte';
	import TiterPlot  from './TiterPlot.svelte';
	import Modal from '../shared/Modal.svelte';
	let titerMethod = "rm_titer";
	let tableData;
	let errorData;
	let plotData;
	let errorSamples;
	let showModal = false;

	$: data = ComputeTiters($PlateStore, $volume, $dilution);
	$: {
		if (data != null) {
			tableData = data.filter((sample) => sample.nrep > 1);
			errorData = data.filter((sample) => sample.nrep < 2);
			plotData = tableData.filter((sample) => sample.rm_titer > 0);
			errorSamples = errorData.map(a => a.sample).join(', ');
			data.forEach(sample => {
				let nameSplit = sample['sample'].toString().split("-");
				if (nameSplit.length > 1) {
					sample['group'] = nameSplit[0];
					sample['sampleName'] = nameSplit[1];
				} else {
					sample['group'] = " ";
					sample['sampleName'] = sample['sample'];
				}
			});
		}
	}
</script>

<div class='container'>
	<div class = "calcmenu grid 1opt:grid-cols-1 2opt:grid-cols-2 3opt:grid-cols-3 gap-2">
		<div class='CalcOpts'>
			Volume (&#181;L):
			<input class="appearance-none bg-gray-200 text-gray-700 border rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" type="number" id="volume" bind:value={$volume} min=1>
		</div>
		<div class='CalcOpts'>
			Dilution:
			<input class="appearance-none bg-gray-200 text-gray-700 border rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white"type="number" id="dilution" bind:value={$dilution} min=1>
		</div>
		<div class='CalcOpts'>
			Method:
			<select class="bg-gray-200 text-gray-700 border rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" name="method" id="method" bind:value={titerMethod}>
				<option value="rm_titer">Reed-Meunch</option>
				<option value="ms_titer_ul">MidSin</option>
			</select>
			<div class='info' on:click="{() => showModal = true}"> &#9432;</div> 
		</div>
	</div>
	{#if showModal}
		<Modal on:close="{() => showModal = false}">
			<h1> Titer Calculator Settings: </h1>

			The following settings can be adjusted to match the experimental parameters.
			<ul class="list-disc">
				<li> Volume (&#181;L): Specify the infection volume in the first row (row A). </li>
				<li> Dilution: Specify the dilution factor between successive rows. </li>
				<li> Method: Specify the method for computing the viral titers. </li>
			</ul>
			<br>
			<h1> Method references: </h1>
			<ul class="list-disc">
				<li><strong>Reed-Meunch</strong>: The Reed-Muench calculation is based off the Bloom Lab <a href='https://github.com/jbloomlab/reedmuenchcalculator'>implementation</a>, originally described in <a href='https://doi.org/10.1093/oxfordjournals.aje.a118408'>Reed and Meunch, 1938</a>.</li>
				<li><strong>MidSin</strong>: The MidSin calculation is based off the original <a href='https://github.com/cbeauc/midSIN'>implementation</a>, described in detail in <a href='https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009480'>Cresta et al, 2021</a>.</li>

		</Modal>
	{/if}

	{#if data != null}
		<TiterPlot {plotData} {titerMethod} />
		
		<TiterTable data={tableData}/>
		
		{#if errorData.length > 0}
			<h3 class='warning'> Warnings </h3>
			The following samples had fewer than 2 replicates and are not displayed in the table or plot: {errorSamples}.
		{/if}		
	{/if}
</div>

<style>
	.container{
		margin: auto;
    	width: 75%;
	}
	input{
		max-width: 100px;
		display: inline-block;
	}
	.warning{
		color: #d9142b;
	}
	ul{
		margin-left: 2em;
	}
	h1 {
		font-size: x-large;
		margin-bottom: 0.3em;
	}
	h3 {
		font-size: large;
	}
	a {
		color: blue;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.info {
		display: inline;
		font-weight: bold;
		vertical-align: super;
		font-size: 15px;
		cursor: pointer;
	}
	.calcmenu {
		margin:auto;
		margin-bottom: 1.5em;
	}	
</style>