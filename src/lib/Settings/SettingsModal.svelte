<script lang="ts">
	import Icon from '@iconify/svelte';
	import SettingsSection from './SettingsSection.svelte';
	import SettingsToggle from './SettingsToggle.svelte';
	import SettingsDropdown from './SettingsDropdown.svelte';

	import { settings } from '$lib/stores';
    import {styles} from '$lib/styles'

	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

    function styleChanged(ev: Event) {
        console.log(ev);
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
		<SettingsDropdown items={$styles.map((val) => {
            return val.name;
        })} on:change={styleChanged}>Theme
        </SettingsDropdown>
	</SettingsSection>
</dialog>

<style lang="scss">
	dialog {
		max-width: 60%;
		min-width: 20%;
		border-radius: 8px;

		border: none;
		background-color: var(--bg500);
		padding: 1rem;
	}

	top-bar {
		display: flex;
		flex-direction: row;

		align-items: center;
		justify-content: space-between;
		& h1 {
			margin: 0;
			font-family: 'EB Garamond';
		}

		& button {
			background-color: unset;
			border: unset;

			width: fit-content;
			height: fit-content;
			border-radius: 2px;

			&:hover {
				background-color: var(--aVisited);
				color: var(--w500);
			}
		}
	}
</style>
