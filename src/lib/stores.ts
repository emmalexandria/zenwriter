import { SvelteComponent } from "svelte";
import { writable, get } from "svelte/store";
import type { IStyle } from "$lib/styles";
import type {IFile} from "$lib/files"

import {getStyleFromName, styles, getSystemTheme} from "$lib/styles"

export interface IEditorState {
    contents: string,
    saved: boolean,
    focused: boolean,
    editorComp: any,
    titleComp: any,
    file: IFile
    currStyle: IStyle
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
    },
    currStyle: getStyleFromName(getSystemTheme())
})

//this is such an incredibly stupid way to handle the issue with the saved state getting overriden when files are opened
//by the content changing, but itll work
export const ignoreNextMdUpdate = writable(false);



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
