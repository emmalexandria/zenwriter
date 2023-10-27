import { writable } from "svelte/store";

export const state = writable({
    filename: "Untitled",
    path: "",
    contents: "",
    saved: true,
    focused: false,
    editorComp: undefined
})

export const focused = writable(false);

export const sidebar = writable({
    currentDir: "",
    files: [],
})

export const settings = writable({
    spellcheck: true,
})