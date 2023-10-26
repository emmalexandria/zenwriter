<script>
    export let items = ["This should have values in it", "There's been a mistake"];
</script>

<div>
<slot/>
<select>
    {#each items as item, i }
        <option value="" selected={i == 0 ? "selected": ""}>{item}</option>
    {/each} 
</select>
</div>

<style>
    select {
        appearance: none;

        padding: 0.675em 6em 0.675em 1em;
        background-color: #fff;
        border: 1px solid #caced1;
        border-radius: 0.25rem;
        color: #000;

        cursor:pointer;
    }

    div {
        width: 100%;
        font-family: "Open Sans";
    }


</style>