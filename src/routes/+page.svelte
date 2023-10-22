<script>
    import TopBar from "$lib/TopBar.svelte"
    import MilkdownEditor from "$lib/MilkdownEditor.svelte";

    

    import {readTextFile, writeTextFile} from "@tauri-apps/api/fs"
    import {open, save, confirm} from "@tauri-apps/api/dialog"

    import {nameFromPath, baseDirFromPath} from "$lib/utils.js"

    let state = {
        filename: "Untitled",
        path: "",
        contents: "",
        saved: true
    }

    let editorComp;

    /* TODO: 
        [x] - Implement ability to erase content of editor 
        [ ] - Implement renaming
        [ ] - Cover case that what you want to rename file to is already existing
        [ ] - Implement 'file rename' event on TopBar so that user intent is retained 
    
    */

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
            state.filename = nameFromPath(selectedPath);
            state.contents = await readTextFile(selectedPath);
            state.saved = true;
            editorComp.setContent(state.contents);

            

        }
        
        catch(err) {
            console.error(err);
        }
        
        
    }

    function saveFile() {
        if(state.path === undefined || state.path === "") {
            saveAs();
        }
        else {
            saveWithState();
        }
    }

    const saveWithState = async () => {
        await writeTextFile(state.path, state.contents);
        state.saved = true;
    }

    const saveAs = async () => {
        try {
            const filePath = await save({
                filters: [{
                    name: 'Markdown',
                    extensions: ['md']
                }],
                title: "Save as",
                defaultPath: state.filename+".md",
            })
            if(!filePath) return;
            state.path = filePath;
            state.filename = nameFromPath(filePath)
            await saveWithState();
        }
        catch(err) {
            console.error(err);
        }
    }

    const newFile = async () => {
        if(state.saved != true) {
            let conf = await confirm(
                "This will discard your changes. Continue?", 
                {type: "warning", title:"zenwriter", cancelLabel: "Cancel", okLabel: "Confirm"}
            );
            if(!conf) return;
        }
        editorComp.setContent("");
        state.path = "";
        state.filename = "Untitled";
        state.contents = "";
    }

    function rename() {
        console.log(typeof(state.path))
        if(state.path="" || state.path == undefined) return
        
        console.log(baseDirFromPath(state.path))

        


    }

    function markdownUpdated(ev) {
        if(ev.detail.new != state.contents) {
            state.saved = false;
        }
        
        state.contents = ev.detail.new;
    }


</script>

<header>
	<TopBar
		bind:title={state.filename}
		fileSaved={state.saved}
		on:openEv={openFile}
		on:saveEv={saveFile}
		on:newEv={newFile}
        on:renameEv={rename}
	/>
</header>
<article>
	<MilkdownEditor on:markdownUpdate={markdownUpdated} bind:this={editorComp} />
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
