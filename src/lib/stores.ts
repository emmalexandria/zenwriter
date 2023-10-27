import { SvelteComponent } from "svelte";
import { writable } from "svelte/store";

interface IEditorState {
    filename: string,
    path: string,
    contents: string,
    saved: boolean,
    focused: boolean,
    editorComp: any
}

export const state = writable<IEditorState>({
    filename: "",
    path: "",
    contents: "",
    saved: true,
    focused: false,
    editorComp: null
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