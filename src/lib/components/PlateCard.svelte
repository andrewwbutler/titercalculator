<script>
	import Card from '../shared/Card.svelte';
	import Button from '../shared/Button.svelte';
	import Plate from './Plate.svelte';
	import { PlateStore, editingPlate } from '../stores/PlateStore.js';
	import { createEventDispatcher } from 'svelte';
	export let plate;
	let dispatch = createEventDispatcher();

	const handleDelete = (id) => {
		PlateStore.update(currentPlates => {
			return currentPlates.filter(plate => plate.id != id)
		})
	};

	const handleEdit = (plate) => {
		editingPlate.set(plate.id);
		dispatch('edit', {
			plate: plate
		});
	}
</script>

<Card cardTitle={plate.name}>
	<Plate {plate} />
	<div class='button-footer relative'>
		<div class="absolute bottom-0 right-0">
			<Button type="primary" on:click={() => handleDelete(plate.id)}> Delete </Button>
		</div>
		<div class="absolute bottom-0 left-0">
			<Button type="secondary" on:click={() => handleEdit(plate)}> Edit </Button>
		</div>
	</div>
</Card>

<style>
	.button-footer{
		height: 35px;
	}
</style>