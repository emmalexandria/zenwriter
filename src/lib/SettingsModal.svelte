<script>
    import Icon from "@iconify/svelte";
	import SettingsSection from "./SettingsSection.svelte";
	import SettingsToggle from "./SettingsToggle.svelte";
	import SettingsDropdown from "./SettingsDropdown.svelte";

    export let showModal;

    let dialog;

    $: if (dialog && showModal) dialog.showModal();

</script>

<dialog bind:this={dialog} on:close={() => (showModal = false)}>
    <top-bar>
        <h1>Settings</h1>
        <button on:click={() => {showModal = false; dialog.close()}}>
            <Icon icon="material-symbols:close" style="display:block; color:inherit;"/>
        </button>
    </top-bar>
    <SettingsToggle>System spellcheck</SettingsToggle>
    <SettingsSection title="Theme">
    <SettingsDropdown>Theme</SettingsDropdown>
    <SettingsDropdown items={["Sync to system", "Light", "Dark"]}>Dark mode</SettingsDropdown>
</SettingsSection>

    
</dialog>

<style lang="scss">
    dialog {
        max-width: 60%;
        min-width: 20%;
        border-radius: 8px;

        border:none;
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
            font-family: "EB Garamond";
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


