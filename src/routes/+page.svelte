<script>
	import Well from "$lib/components/Well.svelte";

	import PlateList from "$lib/components/PlateList.svelte";
	import { createEmptyPlate, PlateStore, editingPlate } from '$lib/stores/PlateStore.js';
	import Tabs from  '$lib/shared/Tabs.svelte';
	import AddNewPlate from '$lib/components/AddNewPlate.svelte';
	import PlateEditor from '$lib/components/PlateEditor.svelte';
	import PlotPage from '$lib/components/PlotPage.svelte';

	// tabs
	let items = ['All Plates', 'Add New Plate', 'Edit Plate', 'Results'];
	let activeItem = 'All Plates';

	// event handlers
	const tabChange = (e) => {
		if (e.detail.currentTab == 'Edit Plate' & e.detail.newTab != 'EditPlate') {
			if ($editingPlate != -1) {
				let plate = $PlateStore.find((plate) => plate.id == $editingPlate)
				plate.added = true;
				editingPlate.set(-1);
			}
		}
		if (e.detail.newTab == 'Results' & $PlateStore.length < 2) {
			activeItem = e.detail.currentTab;
		} else if (e.detail.newTab == 'Edit Plate' & $PlateStore.length < 2) {
			activeItem = e.detail.currentTab;
		} else {
			activeItem = e.detail.newTab;
		}
	}
	const handleAdd = (e) => { 
		activeItem = 'All Plates';
	};
	const handleEdit = (e) => {
		activeItem = 'Edit Plate';
		editingPlate.set(e.detail.plate.id);
	};

</script>

<main>
		
		<Tabs {activeItem} {items} on:tabChange={tabChange}/>
		{#if activeItem === 'All Plates'}
			<PlateList on:edit={handleEdit}/>
		{:else if activeItem === 'Add New Plate'}
			<AddNewPlate on:add={handleAdd}/>
		{:else if activeItem === 'Edit Plate'}
			<PlateEditor on:add={handleAdd}/>
		{:else if activeItem === 'Results'}
		 	<PlotPage />
		{/if}

</main>

<style>
	main{
		margin: 2em;
		min-width: 550px;
		max-width: 1250px;	
		margin-left: auto;
		margin-right: auto;
	}


</style>