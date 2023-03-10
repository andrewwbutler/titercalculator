<script>
	import PlateCard from './PlateCard.svelte'
	import { PlateStore, newestPlate, demoData }  from '../stores/PlateStore.js'
	import { fade, slide, scale } from 'svelte/transition'; 
	import { flip } from 'svelte/animate';
	import Button from '../shared/Button.svelte';

	$: emptyList = $PlateStore.length == 1;
	$: PlateList = $PlateStore.slice(1).reverse();

	const loadDemo = () => {
		PlateStore.set(demoData);
		newestPlate.set(3);
	};

</script>
	<div class='container'>
		<div class = "grid 1plate:grid-cols-1 2plate:grid-cols-2 3plate:grid-cols-3 gap-2">
			{#each PlateList as plate (plate.id)}
				 <div in:fade out:scale|local animate:flip={{duration: 500}}> 
				 	{#if plate.added}
				 		<PlateCard {plate} on:edit />
				 	{/if}
				 </div>
			{/each}
		</div>
		<div class="emptyMessage">
			{#if emptyList}
				<p> Please add a plate to continue </p> <br>
				<Button type="secondary" on:click={() => loadDemo()}> Load Demo data </Button>
			{/if}
		</div>
	</div>

<style>
	.emptyMessage{
		margin: auto;
  		width: 50%;
  		text-align:center;
	}
	.container {
		margin: auto;
		width: 100%;
	}

</style>