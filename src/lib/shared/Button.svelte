<script>
	export let type = 'primary';
	export let flat = true;

</script>

<button class={type} class:flat={flat} on:click> 
	<slot></slot>
</button>

<style>
	button{
		border: 0;
		cursor: pointer;
		border-radius: 6px;
		padding: 8px 12px;
		font-weight: bold;
		box-shadow: 1px 2px 3px rgba(0,0,0,0.2 );
	}
	.primary{
		background: #d9142b;
		color: white;
	}
	.secondary{
		background: #45c496;
		color: white;
	}
	.flat{
		box-shadow: none;
	}

</style>