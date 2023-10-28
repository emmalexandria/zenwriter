<script lang="ts">
    export let toggled: boolean;

</script>

<label class="toggle">
    <slot/>
    <input type="checkbox" bind:checked={toggled}>
    <span class="slider"></span>
</label>

<style>
    label {
        font-family: "Open Sans";
        font-size: 16px;
    }

    input:checked {
        color: var(--accentDark);
    }
</style>