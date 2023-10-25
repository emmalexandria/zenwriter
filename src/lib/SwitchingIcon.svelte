<script>
    import Icon from "@iconify/svelte"
    import {fade} from 'svelte/transition'

    export let icon1;
    export let icon2 = "";
    export let switched = false;
    
    export let height = "32px";
</script>

<icon-container>
{#if !switched}
<div on:click out:fade={{delay: 0, duration: 50}} in:fade={{delay: 50, duration: 50}}>
    <Icon icon={icon1} height={height} style="display: block"/>
</div>
{:else}
<div on:click out:fade={{delay: 0, duration: 50}} in:fade={{delay: 50, duration: 50}}>
    <Icon icon={icon2} height={height} style="display: block"/>
</div>
{/if}

</icon-container>

<style lang="scss">
    div {
        grid-row: 1;
        grid-column: 1;
        padding: unset;
        margin:unset;

        width: fit-content;
        height: fit-content;

        transition: color 0.15s linear;

        &:hover {
            cursor: pointer;

            color: var(--aVisited)
        }
    }

    icon-container {
        display: grid;

        width: fit-content;
        height: fit-content;
    }


</style>
