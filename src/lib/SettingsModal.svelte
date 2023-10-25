<script>
    import Icon from "@iconify/svelte";

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
    <ul>
        <li>Use your imagination to picture a list of settings here</li>
        <li>It'd be really helpful if you did that</li>
    </ul>
</dialog>

<style lang="scss">
    dialog {
        max-width: 60%;
        border-radius: 8px;

        border:none;
        padding: 1rem;
    }

    top-bar {
        display: flex;
        flex-direction: row;

        align-items: center;
        justify-content: space-between;

        & h1 {
            margin: 0;
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


