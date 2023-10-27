import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";
import type {IFile} from "$lib/files"

export interface IEditorState {
    filename: string,
    path: string,
    contents: string,
    saved: boolean,
    focused: boolean,
    editorComp: any,
    titleComp: any,
    file: IFile
}

export const state = writable<IEditorState>({
    filename: "",
    path: "",
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

export const focused = writable(false);

interface ISidebar {
    currentDir: string,
    files: Array<string>,
}

export const sidebar = writable<ISidebar>({
    currentDir: "",
    files: [],
})

export const settings = writable({
    spellcheck: true,
})