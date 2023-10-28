<script lang="ts">
	export let visible: boolean;

	import { sidebar, state, type IEditorState, type ISidebarState } from '$lib/stores';
	import { nameFromPath } from '$lib/utils';
	import { invoke } from '@tauri-apps/api';
	import SidebarItem from './SidebarItem.svelte';

    import {createEventDispatcher} from 'svelte';
	import type { IFile } from './files';

    const dispatch = createEventDispatcher();

    function fileClicked(filePath: any) {
        dispatch('fileClicked', {
            file: filePath
        });
    }

	async function updateSidebar(file_state: IFile, selectedFile = "") {
		if(file_state.basedir != undefined) {
			$sidebar.files = await invoke('get_md_files_from_dir', {dir: file_state.basedir})
		}
	
		$sidebar.updateNeeded = false;
	}

	$: if($sidebar.updateNeeded) updateSidebar($state.file)

	
</script>

<div class:visible>
	<p>
		{#if $state.file.basedir != ''}
			{$state.file.basedir}
		{:else}
			No working directory
		{/if}
	</p>
	<ul>
		{#each $sidebar.files as file}
			<li>
				<SidebarItem {file} on:click={() => fileClicked(file)} selected={false}/>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	div {
		padding: 1rem;
		display: none;
		margin-left: 8px;
		margin-right: 8px;

		grid-row: 2;
		border-radius: 4px;

		overflow: hidden;

		&.visible {
			display: block;
		}

		background-color: var(--bg1);
		height: fit-content;
	}

	p {
		font-family: var(--body-font);
		font-size: 16px;
		text-decoration: underline;
		text-decoration-color: var(--underline);
		text-decoration-thickness: 3px;
		text-underline-offset: 2px;
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
