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


interface ISidebarState {
    files: Array<string>,
}

export const sidebar = writable<ISidebarState>({
    files: [],
})

interface ISettings {
    spellcheck: boolean
}

export const settings = writable<ISettings>({
    spellcheck: true,
})
