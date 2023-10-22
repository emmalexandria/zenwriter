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
	:global(html) {
		height: 100%;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
        background-color: var(--bg);
	}

    app-container {
		width: 100%;
    }

	
    :root {
        --w500: #f4f3f2;
        --bg: #F3EEE7;
        --g100: #121212;
    }
</style>
