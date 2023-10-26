<script>
    export let visible;
</script>


<div class:visible={visible}>
    <h2>
        Sidebar
    </h2>
</div>

<style lang="scss">
    div {
        display: none;
        width: 100%;

        grid-row: 2;

        &.visible {
            display: block;
        }
    }

    h2 {
        font-family: "Open Sans";
        margin: 0;
    }

</style>