<script lang="ts">
	import { createEventDispatcher } from 'svelte';


	import { state, settings } from '$lib/stores';
	import { onMount } from 'svelte';

	import {fade} from 'svelte/transition'

	let editableTitle = '';
	let titleFocused = false;

	const dispatch = createEventDispatcher();

	onMount(() => {
		editableTitle = $state.file.filename;
	});

	function titleKeypress(ev: KeyboardEvent) {
		if (ev.key == 'Enter') {
			ev.preventDefault();
			$state.file.filename = editableTitle;
			$state.editorComp.focus();
			renameEv();
		}
		if (ev.key == 'Escape') {

			$state.editorComp.focus();
		}
	}

	function openEv() {
		dispatch('openEv');
	}

	function newEv() {
		dispatch('newEv');
	}

	function saveEv() {
		dispatch('saveEv');
	}

	function renameEv() {
		dispatch('renameEv');
	}

	function focusIn() {
		titleFocused = true;
	}

	function focusOut() {
		titleFocused = false;

		editableTitle = $state.file.filename;
	}

	export const setTitle = (title: string) => {
		editableTitle = title;
	};
</script>

<div class="outer" class:invisible={$state.focused} out:fade={{delay:0, duration: 50}}>
	<div class="container">
		<p
			class="title"
			id="titleEditable"
			contenteditable="true"
			bind:innerText={editableTitle}
			on:focusin={focusIn}
			on:focusout={focusOut}
			on:keydown={titleKeypress}
			spellcheck={$settings.spellcheck}
		>
			{editableTitle}
		</p>

		<span class="filesaved">{$state.saved ? '' : '*'}</span>
		<end-items>
			<button on:click={newEv}>new</button>
			<button on:click={openEv}>open</button>
			<button on:click={saveEv}>save</button>
			
		</end-items>
	</div>
	<p class="renameinfo" class:visible={titleFocused} contenteditable="false">
		Press enter to rename
	</p>
</div>

<style lang="scss">
	div.container {
		max-width: 100%;
		margin: 0;
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}

	div.outer {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		margin: 0;
		padding: 1rem;
	}

	end-items {
		font-size: 16px;
		display: flex;
		align-items: center;
	}


	span.filesaved {
		font-family: var(--body-font);
		font-size: 12px;
		color: var(--fg);
		opacity: 0.6;
		margin-top: 4px;
		margin-left: 2px;
		margin-right: 12px;

		margin-right: auto;
		align-self: flex-start;
	}

	p.title {
		position: relative;
		font-family: var(--header-font);
		margin: 0;
		font-weight: 700;
		padding: 0;
		font-size: 24pt;
		color: var(--fg);

		outline: none;

		width: max-content;
		min-width: 1ch;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
		text-decoration-color: var(--fg);
		max-width: 60%;
		align-self: flex-start center;
	}

	p.renameinfo {
		display: none;
		padding: 0;
		margin: 0;
		opacity: 0;
		color: var(--fg);
		font-family: var(--body-font);
		font-size: 12px;
		width: 100%;

		transition: opacity 0.1s ease-in-out;
	}

	p.visible {
		display: inline-block;
		opacity: 0.8;
	}

	button {
		border: unset;
		color: var(--fg);
		margin: 0;
		text-decoration: solid underline transparent;
		margin-left: 2px;
		background-color: unset;
		font-family: var(--body-font);
		font-size: 16px;
		width: max-content;
		border-radius: 1rem 1rem 0 0;
		padding: 0.5rem;

		cursor: pointer;

		transition: text-decoration-color 0.3s, font-weight 0.3s;

		&:hover {
			text-decoration-color: var(--fg);
		}
	}
</style>
