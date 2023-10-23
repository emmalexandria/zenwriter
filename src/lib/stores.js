import { writable } from "svelte/store";

export const state = writable({
    filename: "Untitled",
    path: "",
    contents: "",
    saved: true,
})