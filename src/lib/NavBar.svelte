<script>
	import TitleBar from '$lib/TitleBar.svelte';
	import SwitchingIcon from '$lib/SwitchingIcon.svelte';

	export let titleComp;
</script>

<div>
	<span class="icon">
		<SwitchingIcon icon1="gg:sidebar" icon2="gg:sidebar-open" />
	</span>
	<TitleBar bind:this={titleComp} on:openEv on:saveEv on:newEv on:renameEv />
	<span class="icon">
		<SwitchingIcon icon1="fluent:settings-24-regular" icon2="fluent:settings-24-filled" />
	</span>
</div>

<style>
	div {
		display: grid;
		grid-template-columns: auto 60% auto;
		grid-template-rows: 100%;
	}

	div {
		color: var(--g100);
	}

    span.icon {
        align-self: center;
        width: fit-content;

        &:last-child {
            margin-left: auto;
            margin-right: 16px;
        }

        &:first-child {
            margin-right: auto;
            margin-left: 16px;
        }
    }
</style>
