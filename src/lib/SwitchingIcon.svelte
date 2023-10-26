<script>
    import Icon from "@iconify/svelte"
    import {fade} from 'svelte/transition'

    export let icon1;
    export let icon2 = icon1;
    export let switched = false;
    
    export let height = "32px";

    function toggle() {
        switched=!switched;
    }
</script>

<icon-container>
{#if !switched}
<button on:click={toggle} out:fade={{delay: 0, duration: 50}} in:fade={{delay: 50, duration: 50}}>
    <Icon icon={icon1} height={height} style="display: block"/>
</button>
{:else}
<button on:click={toggle} out:fade={{delay: 0, duration: 50}} in:fade={{delay: 50, duration: 50}}>
    <Icon icon={icon2} height={height} style="display: block"/>
</button>
{/if}

</icon-container>

<style lang="scss">
    button {
        background-color: unset;
        border:unset;


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
