<script>
	import {createEventDispatcher} from 'svelte';

	import Icon from '@iconify/svelte';

	export let title = 'Untitled';
	export let fileSaved;

	
    const dispatch = createEventDispatcher();


	function titleKeypress(ev) {
		if(ev.code == 'Enter') {
			ev.preventDefault();
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

</script>

<div>
	<p id="titleEditable" contenteditable="true" bind:innerText={title} on:keypress={titleKeypress}/>
	<span>{fileSaved ? '' : '*'}</span>
	<button on:click={newEv}>new</button>
	<button on:click={openEv}>open</button>
	<button on:click={saveEv}>save</button>
	<span class="threedots">
		<Icon icon="carbon:overflow-menu-horizontal" />
	</span>
</div>

<style lang="scss">
	div {
		max-width: 100%;
		padding: 1rem;
		margin: 0;
		display: flex;
		flex-direction: row;
		align-items: baseline;

		background-color: var(--bg);
	}

	span {
		font-family: 'Open Sans';
		font-size: 16px;
		color: var(--g100);
		opacity: 0.6;
		margin-right: 12px;
	}

	.threedots {
		margin: 0;
		padding: 0;
		margin-left: auto;
	}

	p {
		font-family: 'Open Sans';
		margin: 0;
		padding: 0;
		font-style: italic;
		font-size: 16pt;
		color: var(--g100);

		outline: none;

		width: fit-content;
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
