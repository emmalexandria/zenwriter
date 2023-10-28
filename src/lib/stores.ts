import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";
import type {IFile} from "$lib/files"

export interface IEditorState {
    contents: string,
    saved: boolean,
    focused: boolean,
    editorComp: any,
    titleComp: any,
    file: IFile
}

export const state = writable<IEditorState>({
    contents: "",
    saved: true,
    focused: false,
    editorComp: null,
    titleComp: null,
    file: {
        filename: "",
        basedir: "",
        fullpath: ""
    }
})

//Sidebar state has keeps track of the selected file on its own to avoid some wacky async issues
export interface ISidebarState {
    files: Array<string>,
    updateNeeded: boolean
}

export const sidebar = writable<ISidebarState>({
    files: [],
    updateNeeded: true
})

interface ISettings {
    spellcheck: boolean
}

export const settings = writable<ISettings>({
    spellcheck: true,
})
