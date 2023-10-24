<script>
	import TopBar from '$lib/TopBar.svelte';
	import MilkdownEditor from '$lib/MilkdownEditor.svelte';

	import { state } from '$lib/stores.js';

	import { exists, readTextFile, renameFile, writeTextFile } from '@tauri-apps/api/fs';
	import { open, save, confirm } from '@tauri-apps/api/dialog';
    import {invoke} from "@tauri-apps/api/tauri"
	import {emit} from "@tauri-apps/api/event"

	import { nameFromPath, baseDirFromPath } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let editorComp;
    let barComp;

	/* TODO: 
        [x] - Implement ability to erase content of editor 
        [ ] - Implement renaming
        [ ] - Cover case that what you want to rename file to is already existing
        [ ] - Implement 'file rename' event on TopBar so that user intent is retained 
    
    */

    onMount(() => {
		$state.filename = 'Untitled';
		$state.saved = true;
        $state.path='';
        $state.content='';
	});

	const openFile = async () => {
		const newFile = await invoke("open_file");
		let newFilePath = newFile[0];
		let newFileContent = newFile[1];
		
		if(newFilePath == "") return;
		$state.path = newFilePath;
		$state.filename = nameFromPath(newFilePath);
		$state.contents = newFileContent;
		$state.saved = true;

		editorComp.setContent($state.contents);
		barComp.setTitle($state.filename);
	}

	function saveFile() {
		if ($state.path === undefined || $state.path === '') {
			saveAs();
		} else {
			saveWithState();
		}
	}

	const saveWithState = async () => {
		let str = await invoke("save_file", {path: $state.path, contents: $state.contents});
		if(str != "") {
			$state.saved = true;
		}
	}

	const saveAs = async () => {
		let path = await invoke("save_file_as", {filename: $state.filename, contents: $state.contents});

		if(path == "") return;
		$state.path = path;
		$state.filename = nameFromPath(path);
		barComp.setTitle($state.filename);
	}

	const newFile = async () => {
		if(await invoke("new_file", {saved: $state.saved})) {
			editorComp.setContent('');
			$state.path = '';
			$state.filename = 'Untitled';
			$state.contents = '';
        	$state.saved = true;

        	barComp.setTitle($state.filename);
		}
	};

	const rename = async () => {
		if (($state.path == '' || $state.path == undefined)) return;
        let newPath = baseDirFromPath($state.path) + `/${$state.filename}.md`;
    
        await invoke('rename_file', {oldPath: $state.path, newPath: newPath}).then(success => {
            if(success) {
                $state.path = newPath;
            }
            else {
                $state.filename = nameFromPath($state.path);
            }
        });
	}

	function markdownUpdated(ev) {
		if (ev.detail.new != $state.contents) {
			$state.saved = false;
		}

		$state.contents = ev.detail.new;
	}


</script>

<header>
	<TopBar
        bind:this={barComp}
		on:openEv={openFile}
		on:saveEv={saveFile}
		on:newEv={newFile}
		on:renameEv={rename}
	/>
</header>
<article>
	<MilkdownEditor on:markdownUpdate={markdownUpdated} bind:this={editorComp} />
</article>

<style lang="scss">
	article {
		width: 60%;
		margin: 0 auto;
	}

	header {
		width: 60%;
		margin: 0 auto;
	}
</style>
