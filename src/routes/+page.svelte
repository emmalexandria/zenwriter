<script>
	import TitleBar from '$lib/TitleBar.svelte';
	import MilkdownEditor from '$lib/MilkdownEditor.svelte';
	import SettingsModal from '$lib/Settings/SettingsModal.svelte';
	import Sidebar from '$lib/Sidebar.svelte';

	import { state, sidebar } from '$lib/stores.js';

	import { invoke } from '@tauri-apps/api/tauri';
	import { appWindow } from '@tauri-apps/api/window';

	import { nameFromPath, baseDirFromPath } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import SwitchingIcon from '../lib/SwitchingIcon.svelte';

	let editorComp;
	let titleComp;

	let settingsOpen = false;
	let sidebarOpen = false;

	/* TODO: 
        [x] - Implement ability to erase content of editor 
        [x] - Implement renaming
        [x] - Cover case that what you want to rename file to is already existing
        [x] - Implement 'file rename' event on TopBar so that user intent is retained 
    
    */

	onMount(() => {
		$state.filename = 'Untitled';
		$state.saved = true;
		$state.path = '';
		$state.content = '';
	});

	appWindow.onCloseRequested(async (event) => {
		if (!$state.saved) {
			await warnUnsaved().then((conf) => {
				if (!conf) {
					event.preventDefault();
				}
			});
		}
	});

	const warnUnsaved = async () => {
		return invoke('confirm_unsaved')
	}

	const openFileEv = () => {
		openFile('')
	}

	const openFile = async (path) => {

		if($state.saved == false) {
			if (await warnUnsaved() == false) {
				return
			}
		}
		console.log(path)
		if(path == '') {
			path = await invoke('open_file_prompt');		
		}

		const content = await invoke('open_file', {path: path});;

		if (path == '') return;
		$state.path = path;
		$state.filename = nameFromPath(path);
		$state.contents = content;
		$state.saved = true;

		editorComp.setContent($state.contents);
		titleComp.setTitle($state.filename);

		let baseDir = baseDirFromPath($state.path)

		if ($sidebar.currentDir != baseDir) {
			$sidebar.currentDir = baseDir;
			$sidebar.files = await invoke('get_md_files_from_dir', {dir: baseDir});
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
		let str = await invoke('save_file', { path: $state.path, contents: $state.contents });
		if (str == '') return;
		$state.saved = true;
	};

	const saveAs = async () => {
		let path = await invoke('save_file_as', {
			filename: $state.filename,
			contents: $state.contents
		});

		if (path == '') return;
		$state.path = path;
		$state.filename = nameFromPath(path);
		$state.saved = true;
		titleComp.setTitle($state.filename);
	};

	const newFile = async () => {
		if (await invoke('new_file', { saved: $state.saved })) {
			editorComp.setContent('');
			$state.path = '';
			$state.filename = 'Untitled';
			$state.contents = '';
			$state.saved = true;

			titleComp.setTitle($state.filename);
		}
	};

	const rename = async () => {
		if ($state.path == '' || $state.path == undefined) return;
		let newPath = baseDirFromPath($state.path) + `/${$state.filename}.md`;

		await invoke('rename_file', { oldPath: $state.path, newPath: newPath }).then((success) => {
			if (success) {
				$state.path = newPath;
			} else {
				$state.filename = nameFromPath($state.path);
			}
		});
	};

	function markdownUpdated(ev) {
		if (ev.detail.new != $state.contents) {
			$state.saved = false;
		}

		$state.contents = ev.detail.new;
	}

	function sidebarClick(ev) {
		let file = ev.detail.file;
		if(file == undefined || file == '') {
			return;
		} 

		if(nameFromPath(file) == nameFromPath($state.path)) {
			return;
		}

		openFile(file);
	}
</script>

<article>
	<span class="left icon">
	<SwitchingIcon icon1="gg:sidebar" icon2="gg:sidebar-open" height="24" bind:switched={sidebarOpen} />
	</span>
	<header>
		<title-bar>
			<TitleBar
				bind:this={titleComp}
				on:openEv={openFileEv}
				on:saveEv={saveFile}
				on:newEv={newFile}
				on:renameEv={rename}
			/>
		</title-bar>
	</header>
	<span class="right icon">
	<SwitchingIcon icon1="fluent:settings-24-regular" icon2="fluent:settings-24-filled" height="24" bind:switched={settingsOpen}/>
	</span>
	<Sidebar visible={sidebarOpen} on:fileClicked={sidebarClick}/>
	<body>
		<MilkdownEditor on:markdownUpdate={markdownUpdated} bind:this={editorComp} />
	</body>
</article>

<SettingsModal bind:showModal={settingsOpen} />

<style lang="scss">
	article {
		height: 100%;
		height: fit-content;
		display: grid;

		grid-template-rows: auto 1fr;
		grid-template-columns: 3fr 4fr 3fr;
	}

	body {
		width: 100%;
		margin: 0 auto;

		grid-column: 2;
		grid-row: 2;
	}

	header {
		width: 100%;

		grid-row: 1;
		grid-column: 2;
	}

	.icon {
		width: fit-content; 
		height: min-content;

		align-self: center;
		margin-left: 12px;
		margin-right: 12px;
		
		&.left {
			justify-self: start;
		}
		&.right {
			justify-self: end;
		}
	}


</style>
