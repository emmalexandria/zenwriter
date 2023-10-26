<script>
    export let bindVar;


</script>

<label class="toggle">
    <slot/>
    <input type="checkbox">
    <span class="slider"></span>
  </label>

<style>
    label {
        font-family: "Open Sans";
        font-size: 16px;
    }

    input:checked {
        color: var(--aVisited);
    }
</style>