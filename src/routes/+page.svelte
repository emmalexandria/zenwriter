<script lang="ts">
	import TitleBar from '$lib/TitleBar.svelte';
	import MilkdownEditor from '$lib/MilkdownEditor.svelte';
	import SettingsModal from '$lib/settings/SettingsModal.svelte';
	import Sidebar from '$lib/Sidebar.svelte';

	import { state, sidebar } from '$lib/stores.js';

	import { invoke } from '@tauri-apps/api/tauri';
	import { appWindow } from '@tauri-apps/api/window';

	import { nameFromPath, baseDirFromPath } from '$lib/utils.js';
	import {newFile, openFile, saveFile, renameFile} from "$lib/files"
	import { SvelteComponent, onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import SwitchingIcon from '../lib/SwitchingIcon.svelte';


	let settingsOpen = false;
	let sidebarOpen = false;


	onMount(() => {
		newFile($state);
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
		return invoke('confirm_unsaved');
	};

	const openFileEv = () => {
		openFile($state);
	};

	const saveFileEv = () => {
		saveFile($state);
	};

	const newFileEv = () => {
		newFile($state);
	};

	const renameFileEv = () => {
		renameFile($state.file)
	};


	function markdownUpdated(ev: any) {
		if (ev.detail.new != $state.contents) {
			$state.saved = false;
		}

		$state.contents = ev.detail.new;
	}

	function sidebarClick(ev: any) {
		let file = ev.detail.file;
		if (file == undefined || file == '') {
			return;
		}

		if (nameFromPath(file) == nameFromPath($state.file.fullpath)) {
			return;
		}

		openFile(file);
	}
</script>

<article class:focused={$state.focused}>
	<sidebar-icon class="icon">
		<SwitchingIcon
			icon1="gg:sidebar"
			icon2="gg:sidebar-open"
			height="24"
			bind:switched={sidebarOpen}
		/>
	</sidebar-icon>
	<header>
		<title-bar>
			<TitleBar
				bind:this={$state.titleComp}
				on:openEv={openFileEv}
				on:saveEv={saveFileEv}
				on:newEv={newFileEv}
				on:renameEv={renameFileEv}
			/>
		</title-bar>
	</header>
	<right-icon-group class="icon">
		<span class="inner-icon">
			<SwitchingIcon
				icon1="ri:focus-2-line"
				icon2="ri:focus-2-fill"
				height="24"
				bind:switched={$state.focused}
			/>
		</span>
		<SwitchingIcon
			icon1="fluent:settings-24-regular"
			icon2="fluent:settings-24-filled"
			height="24"
			bind:switched={settingsOpen}
		/>
	</right-icon-group>
	<side-bar>
		<Sidebar visible={sidebarOpen} on:fileClicked={sidebarClick} />
	</side-bar>
	<body>
		<MilkdownEditor on:markdownUpdate={markdownUpdated} bind:this={$state.editorComp}/>
	</body>
</article>

<SettingsModal bind:showModal={settingsOpen} />

<style lang="scss">
	article {
		min-height: 50%;
		height: fit-content;
		display: grid;

		grid-template-rows: auto 1fr;
		grid-template-columns: 25% 50% 25%;

		& body {
			width: 100%;
			margin: 0 auto;

			grid-column: 2;
			grid-row: 2;
		}

		& header {
			width: 100%;

			grid-row: 1;
			grid-column: 2;
		}

	}

	article.focused {
		& body {
			margin-top: 1rem;
			grid-column-start: 1;
			grid-column-end: 4;
			grid-row-start: 1;
			grid-row-end: 3;

			height: 100%;
			width: 80%;
		}

		& header {
			display: none;
		}

		& .icon {
			display: none;
		}

		
		& side-bar {
			display: none;
		}
	}

	.icon {
		width: fit-content;
		height: min-content;

		align-self: center;
		margin-left: 12px;
		margin-right: 12px;
	}

	sidebar-icon {
		justify-self: start;
	}

	right-icon-group {
		display: flex;
		flex-direction: row;
		justify-self: right;
	}

	span.inner-icon {
		margin-right: 12px;
	}
</style>
