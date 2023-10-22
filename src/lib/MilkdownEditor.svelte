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
	import { createEventDispatcher } from 'svelte';
	import { Slice } from '@milkdown/prose/model';

	import { onMount } from 'svelte';

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
			})
			.use(commonmark)
			.use(gfm)
			.use(history)
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
			view.dispatch(state.tr.replace(
                0, 
                state.doc.content.size, 
                new Slice(doc.content, 0, 0)));
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

			font-family: 'Open Sans';
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
	}

	div :global(h2) {
		font-family: 'EB Garamond';
		font-size: 36px;
		margin: 0;
	}

	div :global(h3) {
		font-family: 'EB Garamond';
		font-size: 32px;
		margin: 0;
	}

	div :global(h4) {
		font-family: 'EB Garamond';
		font-size: 28px;
		margin: 0;
	}

	div :global(h5) {
		font-family: 'EB Garamond';
		font-size: 24px;
		margin: 0;
	}

	div :global(h6) {
		font-family: 'EB Garamond';
		font-size: 20px;
		margin: 0;
	}

	div :global(p) {
		font-family: 'Open Sans';
		font-size: 16px;
		margin: 0;
	}

	div :global(blockquote) {
		padding: 1rem;
		border-radius: 6px;
		background-color: #ffffff;
	}

	div :global([data-language]) {
		background-color: #121212;
	}

	div :global(code) {
		padding: 3px;
		background-color: #121212;
		color: #f4f3f2;
		font-family: 'Fira Code';
		font-size: 16px;
		border-radius: 2px;
	}
</style>
