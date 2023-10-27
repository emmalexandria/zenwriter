<script>
	import { createEventDispatcher } from 'svelte';


	import { state, settings } from '$lib/stores';
	import { onMount } from 'svelte';

	import {fade} from 'svelte/transition'

	let editableTitle = '';
	let titleFocused = false;

	const dispatch = createEventDispatcher();

	onMount(() => {
		editableTitle = $state.filename;
	});

	function titleKeypress(ev) {
		if (ev.key == 'Enter') {
			ev.preventDefault();
			$state.filename = editableTitle;
			document.activeElement.blur();
			renameEv();
		}
		if (ev.key == 'Escape') {
			document.activeElement.blur();
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

		editableTitle = $state.filename;
	}

	export const setTitle = (title) => {
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

	.icon {
		color: #121212;
		margin:0;
		padding:0;
		align-self: center;
		margin-left: 4px;
		&:hover {
			color: var(--aVisited);
			cursor: pointer;
		}
	}

	span.filesaved {
		font-family: 'Open Sans';
		font-size: 12px;
		color: var(--g100);
		opacity: 0.6;
		margin-top: 4px;
		margin-left: 2px;
		margin-right: 12px;

		margin-right: auto;
		align-self: flex-start;
	}

	p.title {
		position: relative;
		font-family: 'EB Garamond';
		margin: 0;
		padding: 0;
		font-size: 16pt;
		color: var(--g100);

		outline: none;

		width: max-content;
		min-width: 1ch;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
		text-decoration-color: var(--g100);
		max-width: 60%;
		align-self: flex-start center;
	}

	p.renameinfo {
		display: none;
		padding: 0;
		margin: 0;
		opacity: 0;
		color: var(--g100);
		font-family: 'Open Sans';
		font-size: 12px;
		font-weight: bold;
		width: 100%;

		transition: opacity 0.1s ease-in-out;
	}

	p.visible {
		display: inline-block;
		opacity: 0.8;
	}

	button {
		border: unset;
		margin: 0;
		text-decoration: solid underline transparent;
		margin-left: 2px;
		background-color: unset;
		font-family: 'Open Sans';
		font-size: 16px;
		width: max-content;
		border-radius: 1rem 1rem 0 0;
		padding: 0.5rem;

		cursor: pointer;

		transition: text-decoration-color 0.3s, font-weight 0.3s;

		&:hover {
			text-decoration-color: var(--g100);
		}
	}
</style>
