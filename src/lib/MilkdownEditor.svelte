<script>
	import {
		Editor,
		rootCtx,
		defaultValueCtx,
		editorCtx,
		parserCtx,
		editorViewCtx
	} from '@milkdown/core';
	import { gfm } from '@milkdown/preset-gfm';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { history } from '@milkdown/plugin-history';
	import { indent } from '@milkdown/plugin-indent';
	import { prism, prismConfig } from '@milkdown/plugin-prism';
	import { createEventDispatcher } from 'svelte';
	import { Slice } from '@milkdown/prose/model';

	import { onMount } from 'svelte';

	import rust from 'refractor/lang/rust';
	import css from 'refractor/lang/css';
	import js from 'refractor/lang/javascript';
	import c from 'refractor/lang/c';
	import cpp from 'refractor/lang/cpp';
	import go from 'refractor/lang/go';

	import 'prism-themes/themes/prism-material-light.css';

	const dispatch = createEventDispatcher();

	export let wordCount = 0;

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

	function markdownUpdatedEvent(current, previous) {
		dispatch('markdownUpdate', {
			new: current,
			old: previous
		});

		wordCount = countWords(current);
	}

	function countWords(text) {
		let count = text.split(' ').filter((n) => {
			return n != '';
		}).length;

		return Math.ceil(count / 5) * 5;
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
</script>

<div class="editorDiv" use:editor />
<div class="wordcount"><p>~{wordCount} words</p></div>

<style lang="scss">
	div.editorDiv {
		padding: 1rem;
		background-color: var(--w500);
		white-space: pre-wrap;
		font-family: 'Open Sans';

		border-radius: 6px 6px 0px 0px;
		max-width: 100%;
		margin: 0 auto;
	}

	div.wordcount {
		background-color: var(--w500);

		border-radius: 0px 0px 6px 6px;

		& p {
			width: max-content;
			padding: 1rem;
			margin-left: auto;

			font-family: 'EB Garamond';
			font-size: 12px;
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

</style>
