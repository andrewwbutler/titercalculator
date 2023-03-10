<script>
	export let cardTitle;
</script>

<div class = "card shadow-lg min-w-min">
	<div class = 'title text-xl text-center'>
		{cardTitle}
	</div>
	<slot></slot>
</div>

<style>
	.card{
		padding: 20px;
		max-width: 400px;
		margin:auto;
	}
</style>