<script lang="ts">
    export let file: string;

    let selected: boolean = false;

    import {nameFromPath} from '$lib/utils'
    import {state} from '$lib/stores'

    function isActive(currFilename: string) {
        selected = (nameFromPath(file) == currFilename);
    }

    $: isActive($state.file.filename)
</script>

<button on:click class:selected={selected}>
    <p>{nameFromPath(file)}</p>
</button>
<style lang="scss">
    button {
        border:unset;
        background-color: unset;
        padding: 8px;
        border-radius: 4px;
        margin: unset;

        font-family: var(--body-font);
        font-size: 12px;

        background-color: var(--bg0);
        color: var(--fg);
        opacity: 0.8;

        text-overflow: ellipsis;

        transition: background-color 0.05s linear;

        &.selected {
            background-color: var(--accentDark);
            color: var(--bg1);
        }

        &:hover {
            cursor:pointer;
        }
    }

    p {
        margin: 0;
    }



</style>