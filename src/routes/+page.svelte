<script>
	import TopBar from '$lib/TopBar.svelte';
	import MilkdownEditor from '$lib/MilkdownEditor.svelte';

	import { state } from '$lib/stores.js';

	import { exists, readTextFile, renameFile, writeTextFile } from '@tauri-apps/api/fs';
	import { open, save, confirm } from '@tauri-apps/api/dialog';
    import {invoke} from "@tauri-apps/api/tauri"

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
		try {
			const selectedPath = await open({
				multiple: false,
				filters: [
					{
						extensions: ['md'],
						name: '.md files'
					}
				],
				title: 'Open markdown file'
			});
			if (!selectedPath) return;
			$state.path = selectedPath;
			$state.filename = nameFromPath(selectedPath);
			$state.contents = await readTextFile(selectedPath);
			$state.saved = true;
			editorComp.setContent($state.contents);
            barComp.setTitle($state.filename);
		} catch (err) {
			console.error(err);
		}
	};

	function saveFile() {
		if ($state.path === undefined || $state.path === '') {
			saveAs();
		} else {
			saveWithState();
		}
	}

	const saveWithState = async () => {
		await writeTextFile($state.path, $state.contents);
		$state.saved = true;
	};

	const saveAs = async () => {
		try {
			const filePath = await save({
				filters: [
					{
						name: 'Markdown',
						extensions: ['md']
					}
				],
				title: 'Save as',
				defaultPath: $state.filename + '.md'
			});
			if (!filePath) return;
			$state.path = filePath;
			$state.filename = nameFromPath(filePath);
			await saveWithState();
		} catch (err) {
			console.error(err);
		}
	};

	const newFile = async () => {
		if ($state.saved != true) {
			let conf = await confirm('This will discard your changes. Continue?', {
				type: 'warning',
				title: 'zenwriter',
				cancelLabel: 'Cancel',
				okLabel: 'Confirm'
			});
			if (!conf) return;
		}
		editorComp.setContent('');
		$state.path = '';
		$state.filename = 'Untitled';
		$state.contents = '';
        $state.saved = true;

        barComp.setTitle($state.filename);
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
