<script>
	import "@fontsource/montserrat"
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
        background-color: var(--bg0);
	}

	:global(body::-webkit-scrollbar) {
		width: 12px;
	}

	:global(body::-webkit-scrollbar-track) {
		background: var(--scrollbar-track);
	}

	:global(body::-webkit-scrollbar-thumb) {
		background-color: var(--bg1);
		border: 3px solid var(--scrollbar-track);
		border-radius: 6px;
	}

	:global(::selection) {
		background-color: var(--select-color)
	}

    app-container {
		width: 100%;
    }

	:root {
		--text-0: 12px;
		--text-1: 16px;
		--text-2: 20px;
		--text-3: 24px;
		--text-4: 28px;
		--text-5: 32px;
		--text-6: 36px;
		--text-7: 40px;


	}

	

</style>
