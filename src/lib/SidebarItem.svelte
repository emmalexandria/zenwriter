<script lang="ts">
    export let file: string;

    import {nameFromPath} from '$lib/utils'
    import {state} from '$lib/stores'

</script>

<button on:click class:selected={$state.file.filename == nameFromPath(file)}>
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