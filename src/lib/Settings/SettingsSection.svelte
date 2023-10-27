<script lang="ts">
    export let title: string;
</script>

<div>
<h2>{title}</h2>
<hr>
<slot/>
</div>


<style lang="scss">
    h2 {
        font-family: "EB Garamond";
        margin:0;
    }

    hr {
        border: none;
        border-top: 1px solid var(--g100);
        color: var(--g100);
        opacity: 0.8;
    }



</style>