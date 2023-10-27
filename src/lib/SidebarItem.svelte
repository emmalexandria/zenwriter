<script lang="ts">
    export let file: string;
    export let selected: boolean;

    import {nameFromPath} from '$lib/utils'


    $: console.log(selected)
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

        font-family: "Open Sans";
        font-size: 12px;

        background-color: var(--bg500);
        opacity: 0.8;

        text-overflow: ellipsis;

        &.selected {
            background-color: var(--aVisited);
            color: var(--w500);
        }

        &:hover {
            cursor:pointer;
        }
    }

    p {
        margin: 0;
    }



</style>