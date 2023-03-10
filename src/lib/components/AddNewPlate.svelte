<script>
	import { createEmptyPlate, PlateStore, newestPlate} from '../stores/PlateStore.js';
	import Plate from './Plate.svelte';
	import ColumnNamesForm from './ColumnNamesForm.svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from '../shared/Button.svelte';
	let dispatch = createEventDispatcher();

	const addPlate = (plateID) => {
		PlateStore.update(currentPlates => {
			let copiedPlates = [...currentPlates];
			//Mark plate as added
			let plateToAdd = copiedPlates.find((plate) => plate.id == plateID);
			plateToAdd.added = true;
			let newPlate = createEmptyPlate($newestPlate + 1);
			copiedPlates = [newPlate, ...copiedPlates];
			return copiedPlates;
		});
		newestPlate.update(n => n + 1);
		dispatch('add');
	}

	$: plate = $PlateStore.find((plate) => plate.id == $newestPlate);
</script>

<form class="NameForm">
	Plate Name: <input class="appearance-none bg-gray-200 text-gray-700 border rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" id="question" type="text" bind:value={plate.name}>
</form>
<Plate { plate }/>
<div class="ButtonContainer">
	<Button type="secondary" on:click={() => addPlate(plate.id)}> Add Plate </Button> 
</div>
<ColumnNamesForm {plate} />

<style>
	.NameForm{
		margin: auto;
  		width: 50%;
  		text-align: center;
	}
	.ButtonContainer{
		margin: auto;
		margin-bottom:1em;
  		width: 50%;
  		text-align: center;
	}
</style>