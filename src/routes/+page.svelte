<script>
    import TopBar from "$lib/TopBar.svelte"
    import MilkdownEditor from "$lib/MilkdownEditor.svelte";

    

    import {readTextFile} from "@tauri-apps/api/fs"
    import {open} from "@tauri-apps/api/dialog"

    let state = {
        filename: "New file",
        path: "",
        contents: "",
        saved: true
    }

    const openFile = async () => {
        try {
            const selectedPath = await open({
                multiple: false,
                filters: [{
                    extensions: ['md'],
                    name: '.md files'
                }],
                title: 'Open markdown file', 
            })
            if(!selectedPath) return;
            state.path = selectedPath;
            state.contents = await readTextFile(selectedPath);
        }
        
        catch(err) {
            console.error(err);
        }
    }

    function saveFile() {
        if(state.path === undefined || state.path === "") {
            console.log("No file path");
        }
    }

    function newFile() {

    }

    function markdownUpdated(ev) {
        state.saved = false;
        state.contents = ev.detail.new;
    }

    $: console.log(state.contents);


</script>

<header><TopBar bind:title={state.path} fileSaved={state.saved} on:openEv={openFile}/></header>
<article>
	<MilkdownEditor on:markdownUpdate={markdownUpdated}/>
</article>

<style lang="scss">
    article {
        width: 60%;
		margin: 0 auto;
	}

	header {
		width: 60%;
		margin: 0 auto;
	}



</style>