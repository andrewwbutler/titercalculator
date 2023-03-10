<script>

	import Plate from './Plate.svelte';
	import { PlateStore, newestPlate, editingPlate }  from '../stores/PlateStore.js';
	import ColumnNamesForm from './ColumnNamesForm.svelte';
	import Button from '../shared/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();
	export let plate = $PlateStore.find((plate) => plate.id == $editingPlate);
	let selectedPlate;

	if (plate != null) {
		plate.added = false;
	}
	const selectPlate = (plateName) => {
		plate = $PlateStore.find((plate) => plate.name == plateName);
		plate.added = false;
		editingPlate.set(plate.id);
	}
	const updatePlate = (plateName) => {
		plate.added = true;
		editingPlate.set(-1);
		dispatch('add');
	}

	</script>

{#if plate != null}
	<form class="NameForm">
		Plate Name: <input class="appearance-none bg-gray-200 text-gray-700 border rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" id="question" type="text" bind:value={plate.name}>
	</form>
	<Plate {plate}/>
	<div class="ButtonContainer">
		<Button type="secondary" on:click={() => updatePlate(plate.name)}> Update Plate </Button> 
	</div>
	<ColumnNamesForm {plate} />
{:else}
	Plate to edit:
	<select class="bg-gray-200 text-gray-700 border rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white" name="plates" id="plates" bind:value={selectedPlate} on:change={() => selectPlate(selectedPlate)}>
	<option value="none" selected disabled hidden> </option>
	{#each $PlateStore as plateOption}
		{#if plateOption.added === true}
			<option	>{plateOption.name}</option>
		{/if}
	{/each}
	</select> 
{/if}

<style>
	.NameForm{
		margin: auto;
  		width: 50%;
  		text-align: center;
	}	
	.ButtonContainer{
		margin: auto;
  		width: 50%;
  		text-align: center;
	}
</style>
