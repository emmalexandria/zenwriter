<script lang="ts">
	import Icon from '@iconify/svelte';
	import SettingsToggle from './SettingsToggle.svelte';
	import SettingsDropdown from './SettingsDropdown.svelte';

	import { settings, state } from '$lib/stores';
    import {getStyleFromName, styles} from '$lib/styles'

	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

    let selected: string = $state.currStyle.name;

    $: updateStyle(selected)

    function updateStyle(name: string) {
        $state.currStyle = getStyleFromName(name)
    }

    $: styleUpdated($state.currStyle.name)

    function styleUpdated(name: string) {
        selected = name;
    }

</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
	<top-bar>
		<h1>Settings</h1>
		<button
			on:click={() => {
				showModal = false;
				dialog.close();
			}}
		>
			<Icon icon="material-symbols:close" style="display:block; color:inherit;" />
		</button>
		
	</top-bar>
	<hr/>
	<SettingsToggle bind:toggled={$settings.spellcheck}>System spellcheck</SettingsToggle>
	<h2>Theme</h2>
	<hr>
		<SettingsDropdown bind:selected={selected} items={$styles.map((val) => {
            return val.name;
        })}>Theme
        </SettingsDropdown>
</dialog>

<style lang="scss">
	dialog {
		max-width: 60%;
		min-width: 20%;
		border-radius: 8px;

		border: none;
		background-color: var(--bg0);
        color: var(--fg);
		padding: --var(padding-big);
	}

	h1,h2,h3,h4,h5 {
		font-family: var(--header-font);
		margin: 0;
		margin-top: 12px;
	}

	top-bar {
		display: flex;
		flex-direction: row;

		align-items: center;
		justify-content: space-between;
		& h1 {
			margin: 0;
			font-family: var(--header-font);
			font-size: var(--text-5);
		}

		& button {
			background-color: unset;
			border: unset;

			width: fit-content;
			height: fit-content;
			border-radius: 2px;

            color: var(--fg);

			&:hover {
				background-color: var(--accentDark);
				color: var(--bg1);
                cursor: pointer;
			}
		}
	}

	hr {
		border: none;
        border-top: 1px solid var(--fg);
        color: var(--fg);
        opacity: 0.8;
	}
</style>
