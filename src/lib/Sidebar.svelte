<script>
    export let visible;

    import {sidebar} from '$lib/stores'
    import {nameFromPath} from '$lib/utils'
	import SidebarItem from './SidebarItem.svelte';

</script>


<div class:visible={visible}>
    <p>
        {#if $sidebar.currentDir != ''}
        {$sidebar.currentDir}
        {:else}
        "No dir open"
        {/if}
    </p>
    {#each $sidebar.files as file }
       <SidebarItem {file}/>
    {/each}
</div>

<style lang="scss">
    div {
        display: none;
        margin-left: 8px;

        width: 60%;
        grid-row: 2;
        border-radius: 4px;

        overflow: hidden;

        &.visible {
            display: block;
        }

        background-color: var(--w500);
        height: fit-content;
        padding: 8px;
    }

    p {
        font-family: "Open Sans";
        margin: 0;
    }

</style>