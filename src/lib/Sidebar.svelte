<script lang="ts">
	export let visible: boolean;

	import { sidebar, state, type IEditorState, type ISidebarState } from '$lib/stores';
	import { baseDirName, nameFromPath } from '$lib/utils';
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

	async function updateSidebar(file_state: IFile) {
		if(file_state.basedir != undefined) {
			$sidebar.files = await invoke('get_md_files_from_dir', {dir: file_state.basedir})
			
		}
	
		$sidebar.updateNeeded = false;
	}

	$: if($sidebar.updateNeeded) updateSidebar($state.file);


	
</script>

<div class:visible>
	<p>
		{#if $state.file.basedir != ''}
			{baseDirName($state.file.basedir)}
		{:else}
			No working directory
		{/if}
	</p>
	<ul>
		{#each $sidebar.files as file}
			<li>
				<SidebarItem {file} on:click={() => fileClicked(file)}/>
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
		text-decoration-thickness: 2px;
		text-underline-offset: 1px;
        font-weight: bold;
		margin: 0;

		overflow-x: auto;

		&::-webkit-scrollbar {
			height: 12px;
		}

		&::-webkit-scrollbar-track {
			background: var(--scrollbar-track);
			border-radius: 0 0 2px 2px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: var(--scrollbar-thumb);
			border: 3px solid var(--scrollbar-track);
			border-radius: 6px;
		}
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
