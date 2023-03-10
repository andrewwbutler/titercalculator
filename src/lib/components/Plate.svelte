<script>
	import Well from "./Well.svelte";
	import { PlateStore } from '../stores/PlateStore.js';
	export let plate;
	let numColumns = plate.maxWell.length;
	let rowLetters = ['A','B','C','D','E','F','G','H'];
	let colNumbers = Array.from({length: 12}, (_, i) => i + 1)

	const handleClick = (plateID, colIdx, rowIdx) => {
		if (!plate.added) {
			if (plate.maxWell[colIdx] == rowIdx) {
				plate.maxWell[colIdx] = -1;
			} else {
				plate.maxWell[colIdx] = rowIdx;
			}
			PlateStore.update((currentPlates) => {
				let copiedPlates = [...currentPlates];
				let selectedPlate = copiedPlates.find((plate) => plate.id === plateID);
				selectedPlate = plate;
				return(copiedPlates);
			});
		}
	};
</script>


<table>
	<tr>
		<td></td>
		{#each colNumbers as colNum}
			<td>{colNum}</td>
		{/each}
	</tr>
	{#each rowLetters as row, rowIdx}
	<tr>
		<td> {row} </td>
		{#each plate.maxWell as well, colIdx}
			<td> 
				<Well selected={rowIdx <= well} added={plate.added} on:click={() => handleClick(plate.id, colIdx, rowIdx)} /> 
			</td>
			{/each}
	</tr>
	{/each}
</table>

<style>
	table {
	    border: 1px;
	    border-style: solid;
	    border-color: darkgrey;
	    margin:auto;
	    margin-bottom: 20px;
	    margin-top: 10px;
  	}
 	td {
  		text-align: center;
	}
</style>