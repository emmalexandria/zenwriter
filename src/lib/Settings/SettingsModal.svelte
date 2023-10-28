<script lang="ts">
	import Icon from '@iconify/svelte';
	import SettingsSection from './SettingsSection.svelte';
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

        console.log(getStyleFromName(name))
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
	<SettingsToggle bind:toggled={$settings.spellcheck}>System spellcheck</SettingsToggle>
	<SettingsSection title="Theme">
		<SettingsDropdown bind:selected={selected} items={$styles.map((val) => {
            return val.name;
        })}>Theme
        </SettingsDropdown>
	</SettingsSection>
</dialog>

<style lang="scss">
	dialog {
		max-width: 60%;
		min-width: 20%;
		border-radius: 8px;

		border: none;
		background-color: var(--bg0);
        color: var(--fg);
		padding: 1rem;
	}

	top-bar {
		display: flex;
		flex-direction: row;

		align-items: center;
		justify-content: space-between;
		& h1 {
			margin: 0;
			font-family: var(--header-font);;
		}

		& button {
			background-color: unset;
			border: unset;

			width: fit-content;
			height: fit-content;
			border-radius: 2px;

			&:hover {
				background-color: var(--accentDark);
				color: var(--bg1);
			}
		}
	}
</style>
