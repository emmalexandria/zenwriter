<script>
	import {
		Editor,
		rootCtx,
		defaultValueCtx,
		editorCtx,
		schemaCtx,
		parserCtx,
		editorViewCtx
	} from '@milkdown/core';

	import { DOMSerializer } from '@milkdown/prose/model';

	import { gfm } from '@milkdown/preset-gfm';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { history } from '@milkdown/plugin-history';
	import { indent } from '@milkdown/plugin-indent';
	import { prism, prismConfig } from '@milkdown/plugin-prism';
	import { createEventDispatcher } from 'svelte';
	import { Slice } from '@milkdown/prose/model';

	import rust from 'refractor/lang/rust';
	import css from 'refractor/lang/css';
	import js from 'refractor/lang/javascript';
	import c from 'refractor/lang/c';
	import cpp from 'refractor/lang/cpp';
	import go from 'refractor/lang/go';

	import 'prism-themes/themes/prism-material-light.css';

	import {settings, state} from "$lib/stores"

	const dispatch = createEventDispatcher();

	let currentText;

	let editorRef;

	function editor(dom) {
		editorRef = Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
					markdownUpdatedEvent(markdown, prevMarkdown);
				});
				ctx.set(prismConfig.key, {
					configureRefractor: (refractor) => {
						refractor.register(js);
						refractor.register(css);
						refractor.register(rust);
						refractor.register(c);
						refractor.register(cpp);
						refractor.register(go);
					}
				});
			})
			.use(commonmark)
			.use(gfm)
			.use(history)
			.use(prism)
			.use(indent)
			.use(listener)
			.create();
	}

	const markdownUpdatedEvent = async(current, previous) => {
		updateCurrentText();

		dispatch('markdownUpdate', {
			new: current,
			old: previous
		});
	}
	

	function countWords(text) {
		if (text == undefined) return 0;
		let count = text.split(' ').filter((n) => {
			return n != '';
		}).length;

		return count;
	}

	export const setContent = async (content) => {
		let res = await editorRef;
		res.action((ctx) => {
			const view = ctx.get(editorViewCtx);
			const parser = ctx.get(parserCtx);
			const doc = parser(content);
			if (!doc) return;
			const state = view.state;
			view.dispatch(state.tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0)));
		});
	};

	export const focus = async (content) => {
		let res = await editorRef;
		res.action((ctx) => {
			ctx.get(editorViewCtx).focus();
		});
	};

	export const updateCurrentText = async () => {
		let res = await editorRef;
		res.action((ctx) => {
			const div = document.createElement('div');
			const schema = ctx.get(schemaCtx);
			const view = ctx.get(editorViewCtx);
			const fragment = DOMSerializer.fromSchema(schema).serializeFragment(view.state.doc.content);

			div.appendChild(fragment);

			//this is janky but append a space in order to force newlines to be recognised as things which split words
			div.appendChild(document.createTextNode(" "))

			currentText = div.innerText;
		});
	};

	function editorKeydownHandler(ev) {
		if($state.focused && ev.key == "Escape") {
			$state.focused = false;
		}
	}
</script>

<div class="editorDiv" use:editor spellcheck={$settings.spellcheck} on:keydown={editorKeydownHandler}/>
<bottom-bar>
	{#if $state.focused}
		<p class="focusmsg">Press escape to exit focus mode</p>
	{/if}
	<p class="wordcount">{countWords(currentText)} words</p>
</bottom-bar>

<style lang="scss">
	div.editorDiv {
		padding: 1rem;
		background-color: var(--w500);
		white-space: pre-wrap;
		font-family: 'Open Sans';

		border-radius: 6px 6px 0px 0px;
		max-width: 100%;

		overflow-x: wrap;
		min-height: 50%;
		margin: 0 auto;
	}


	bottom-bar {
		display: flex;
		flex-direction: row;

		padding: 12px;
		background-color: var(--w500);

		border-radius: 0px 0px 6px 6px;

		& p {
			width: max-content;

			font-family: 'EB Garamond';
			font-size: 12px;

			margin: 0;
			
		}

		& .wordcount {
			font-style: italic;
			opacity: 0.8;
			margin-left: auto;

		}

		& .focusmsg {

			font-size: 14px;
			font-family: 'Open Sans';
			font-style: italic;
			opacity: 0.8;
		}
	}

	div :global(.milkdown) {
		height: 100%;
	}

	div :global(.editor) {
		min-height: 100%;
		outline: none;
	}

	div :global(h1) {
		font-family: 'EB Garamond';
		font-size: 40px;
		margin: 0;
		margin-bottom: 10px;
	}

	div :global(h2) {
		font-family: 'EB Garamond';
		font-size: 36px;
		margin: 0;
		margin-bottom: 9px;
	}

	div :global(h3) {
		font-family: 'EB Garamond';
		font-size: 32px;
		margin: 0;
		margin-bottom: 8px;
	}

	div :global(h4) {
		font-family: 'EB Garamond';
		font-size: 28px;
		margin: 0;
		margin-bottom: 7px;
	}

	div :global(h5) {
		font-family: 'EB Garamond';
		font-size: 24px;
		margin: 0;
		margin-bottom: 6px;
	}

	div :global(h6) {
		font-family: 'EB Garamond';
		font-size: 20px;
		margin: 0;
		margin-bottom: 5px;
	}

	div :global(p) {
		font-family: 'Open Sans';
		font-size: 16px;
		margin: 0;
		margin-bottom: 4px;
	}

	div :global([data-language]) {
		background-color: #121212;
		padding: 1rem;
		border-radius: 4px;

		overflow-x: auto;

		&::-webkit-scrollbar {
			height: 12px;
		}

		&::-webkit-scrollbar-track {
			background: var(--bg400);
			border-radius: 0 0 2px 2px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: var(--w500);
			border: 3px solid var(--bg400);
			border-radius: 6px;
		}
	}

	div :global(code) {
		color: #f4f3f2;
		font-family: 'Fira Code';
		font-size: 16px;
		max-width: 100%;
	}

	div :global(a) {
		color: var(--a);

		&:visited {
			color: var(--aVisited);
		}
	}

	div :global(img) {
		max-width: 100%;
		border-radius: 4px;
	}
</style>
