<script>
	export let selected = false;
	export let added = false;
	export let rowLetter = '';
</script>

<div class="button-row">
	<div class="letter-label">
		{rowLetter}
	</div>
	<button class:selected={selected} class:added={added} on:click> 
		<slot></slot>
	</button>
</div>

<style>
	button{
		height: 25px;
	    width: 25px;
	    padding: 0px;
	    margin: 1px;
	    background-color: #bbb;
	    border-radius: 50%;
	    display: inline;
	}
	.selected{
		background-color: red;
	}
	.letter-label{
		width: 15px;
		display: inline;
	}
	.added {
		cursor: default;
	}
</style>
