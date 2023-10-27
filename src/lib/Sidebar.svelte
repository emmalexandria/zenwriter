<script lang="ts">
	export let visible: boolean;

	import { sidebar, state, type IEditorState } from '$lib/stores';
	import { nameFromPath } from '$lib/utils';
	import { invoke } from '@tauri-apps/api';
	import SidebarItem from './SidebarItem.svelte';

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function fileClicked(filePath: any) {
        dispatch('fileClicked', {
            file: filePath
        });
    }

	$: updateSidebar($state)

	async function updateSidebar(state: IEditorState) {
		$sidebar.files = await invoke('get_md_files_from_dir', {dir: state.file.basedir})
	}

</script>

<div class:visible>
	<p>
		{#if $state.file.basedir != ''}
			{$state.file.basedir}
		{:else}
			No dir open
		{/if}
	</p>
	<ul>
		{#each $sidebar.files as file}
			<li>
				<SidebarItem {file} selected={nameFromPath(file)==$state.file.filename} on:click={() => fileClicked(file)}/>
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
	}

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
        margin-top: 8px;
    }
</style>
