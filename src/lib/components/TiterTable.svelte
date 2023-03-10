<script>
	import Button from '../shared/Button.svelte';
	export let data;
	let titerCols = ['rm_titer', 'ms_titer_ul', 'ms_titer'];

	// Download code repurposed from https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
	const handleDownload = () => {
		let csvData = [['sample', 'ReedMuench_titer', 'MidSin_titer_uL', 'MidSin_titer_log10mL', 'nrep']];
		data.forEach(sample => {
			csvData = [...csvData, [sample.sampleName, sample.rm_titer, sample.ms_titer_ul, sample.ms_titer, sample.nrep]];
		});
		let csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
		var encodedUri = encodeURI(csvContent);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		let date = new Date().toISOString().slice(0, 10);
		link.setAttribute("download", date + "_titers.csv");
		document.body.appendChild(link); // Required for FF
		link.click(); // 
	}

</script>

{#if data != null}
	<table class="titer-table">
		<tr>
			<th> Sample </th>
			<th class = 'titer'> TCID50/&#181;L </th>
			<th class = 'titer'> SIN/&#181;L </th>
			<th class = 'titer'> Log10 SIN/mL </th>
			<th class = 'titer'> # Replicates </th>
		</tr>

		{#each data as sample}
		<tr>
			<td>{sample.sampleName}</td>
			{#each titerCols as col}
				<td class='titer'>{sample[col].toFixed(2)}</td>
			{/each}
			<td class='titer'>{sample.nrep}</td>
		</tr>
		{/each}
	</table>
		<div class='dl_button'>
			<Button type="secondary" on:click={handleDownload}> Download CSV </Button>
		</div>

{/if}

<style>
	.titer-table{
		padding-top: 50px;
   		width: 525px;
   		border-collapse: collapse;
   		margin-bottom: 10px;
   		margin-left: auto;
   		margin-right: auto;
	}
	th{
		border-top:  thin solid black;
		border-bottom: thin solid black;
		text-align:  left;
	}
	td {
		text-align: left;
	}
	.titer{
		text-align: right;
	}
	.dl_button{
		margin-left: auto;
		margin-right: auto;
		margin-top:1em;
		width: 200px;
	}
</style>