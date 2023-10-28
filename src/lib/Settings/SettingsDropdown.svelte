<script lang="ts">
    export let items = ["This should have values in it", "There's been a mistake"];

    export let selected: string;

    function onChange(ev: Event) {
        let selectElement: HTMLSelectElement = ev.target as HTMLSelectElement;
        selected = selectElement.options[selectElement.selectedIndex].text;
    }
</script>

<div>
<slot/>
<select on:change={onChange}>
    {#each items as item}
        <option value="" selected={item==selected}>{item}</option>
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