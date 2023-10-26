<script>
    export let file;

    import {nameFromPath} from '$lib/utils'
</script>

<button on:click>
    <p>{nameFromPath(file)}</p>
</button>
<style lang="scss">
    button {
        border:unset;
        background-color: unset;
        padding: unset;
        margin: unset;

        margin: 4px 0 4px 0;
        font-family: "Open Sans";
        font-size: 12px;

        background-color: var(--bg500);
        opacity: 0.8;
    }



</style>