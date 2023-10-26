<script>
	export let visible;

	import { sidebar, state } from '$lib/stores';
	import { nameFromPath } from '$lib/utils';
	import SidebarItem from './SidebarItem.svelte';

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function fileClicked(filePath) {
        dispatch('fileClicked', {
            file: filePath
        });
    }

</script>

<div class:visible>
	<p>
		{#if $sidebar.currentDir != ''}
			{$sidebar.currentDir}
		{:else}
			No dir open
		{/if}
	</p>
	<ul>
		{#each $sidebar.files as file}
			<li>
				<SidebarItem {file} selected={nameFromPath(file)==nameFromPath($state.path)} on:click={fileClicked(file)}/>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	div {
		display: none;
		margin-left: 8px;

		max-width: 80%;
        width: fit-content;


		grid-row: 2;
		border-radius: 4px;

		overflow: hidden;

		&.visible {
			display: block;
		}

		background-color: var(--w500);
		height: fit-content;
		padding: 8px;
	}

	p {
		font-family: 'Open Sans';
        text-decoration: underline;
		font-size: 12px;
        font-weight: bold;
		margin: 0;
        margin-bottom: 8px;
	}

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
    }
</style>
