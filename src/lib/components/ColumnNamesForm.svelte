<script>
	import { PlateStore } from '../stores/PlateStore.js'
	export let plate;
	let selectedPlate;
	const copyColNames = (selectedPlate) => {
		const selectedPlateNames = $PlateStore.find((plate) => plate.name == selectedPlate).colNames;
		plate.colNames = [...selectedPlateNames];
	}
</script>

<div class="CopySelect">
	Copy column labels of exiting plate:
	<select class="bg-gray-200 text-gray-700 border rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" name="plates" id="plates" bind:value={selectedPlate} on:change={() => copyColNames(selectedPlate)}>
		<option value="none" selected disabled hidden> </option>
		{#each $PlateStore as plate}
			{#if plate.added === true}
				<option	>{plate.name}</option>
			{/if}
		{/each}
	</select> 
</div>

<div class = "grid 1form:grid-cols-1 2form:grid-cols-2 3form:grid-cols-3 gap-x-8 gap-y-4">
	{#each plate.colNames as colName, i}
			<form>
				<label for="question">Column {i+1} Sample Name:</label>
				<input class="appearance-none bg-gray-200 text-gray-700 border rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white colinput" id="question" type="text" bind:value={colName}>
			</form>
	{/each}
</div>

<style>
	.CopySelect{
		margin-bottom: 1em;
	}
	.colinput {
		width: 10em;
	}
</style>