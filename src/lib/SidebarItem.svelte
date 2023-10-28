<script lang="ts">
    export let file: string;

    import {nameFromPath} from '$lib/utils'

</script>

<button on:click>
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