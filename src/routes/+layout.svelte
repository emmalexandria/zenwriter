<script>
	import TopBar from '../lib/TopBar.svelte';
	import MilkdownEditor from '../lib/MilkdownEditor.svelte';


	import "@fontsource/eb-garamond"
	import "@fontsource/open-sans"

</script>

<app-container>
    <slot/>
</app-container>

<style lang="scss">
	@use "../lib/breakpoints.scss" as *;

	:global(html) {
		height: 100%;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
        background-color: var(--bg500);
	}

	:global(body::-webkit-scrollbar) {
		width: 12px;
	}

	:global(body::-webkit-scrollbar-track) {
		background: var(--bg400);
	}

	:global(body::-webkit-scrollbar-thumb) {
		background-color: var(--w500);
		border: 3px solid var(--bg400);
		border-radius: 6px;
	}

	:global(::selection) {
		background-color: var(--bg300)
	}


    app-container {
		width: 100%;
    }

	
    :root {
        --w500: #f4f3f2;
		--bg300: #c2beb9;
		--bg400: #dbd6d0;
        --bg500: #F3EEE7;
		--bg600: #f4f0e9;
        --g100: #121212;
    }

</style>
