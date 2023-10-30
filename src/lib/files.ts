import { invoke } from "@tauri-apps/api"

import {get} from "svelte/store"

import type { IEditorState } from "$lib/stores"
import {ignoreNextMdUpdate, state} from "$lib/stores"


export interface IFile {
    filename: string,
    basedir: string,
    fullpath: string,
}

export async function renameFile(state: IEditorState) {
    let fullpath = `${state.file.basedir}/${state.file.filename}.md`

    await invoke('rename_file', { oldPath: state.file.fullpath, newPath: fullpath }).then((success: any) => {
        if (success) {
            state.file.fullpath = fullpath;
        }
        else {
            //this is a little dumb but it works
            state.file.filename = nameFromPath(state.file.fullpath)
        }
    })

};


export async function newFile(state: IEditorState) {
    if (!state.saved) {
        let confirm: boolean = await invoke("confirm_unsaved");
        if (!confirm) return;
    }

    state.editorComp.setContent('');
    state.file = {
        filename: 'Untitled',
        basedir: '',
        fullpath: ''
    }
    state.contents = '';
    state.saved = true;

    state.titleComp.setTitle(state.file.filename)
    state.editorComp.focus();
}

export async function saveFile(state: IEditorState) {
    if (state.file.fullpath === '') {
        let path: string = await invoke('save_file_as', { filename: state.file.filename, contents: state.contents });

        //File was not saved
        if (path == '') return;

        state.file = {
            filename: nameFromPath(path),
            basedir: baseDirFromPath(path),
            fullpath: path
        }

        state.editorComp.focus();

        state.titleComp.setTitle(state.file.filename);
        state.editorComp.setContent(state.contents);
        ignoreNextMdUpdate.set(true);
        state.saved = true;

        

    }
    else {
        let path: string = await invoke('save_file', { path: state.file.fullpath, contents: state.contents });

        if (path == '') {
            console.error(`Saving file ${state.file.fullpath} was unsuccessful!`);
            return;
        }

        state.editorComp.setContent(state.contents);
        ignoreNextMdUpdate.set(true);
        state.saved = true;
    } 
    
}

export async function openFile(state: IEditorState) {
    if (!state.saved) {
        let conf: boolean = await invoke('confirm_unsaved');
        if (!conf) {
            return;
        }
    }

    let newPath: string = await invoke('open_file_prompt');
    if (newPath == '') return;

    let newContent: string = await invoke('open_file', { path: newPath });

    state.file = {
        filename: nameFromPath(newPath),
        basedir: baseDirFromPath(newPath),
        fullpath: newPath
    }
    state.contents = newContent;
    state.editorComp.setContent(state.contents);
    state.titleComp.setTitle(state.file.filename)

    ignoreNextMdUpdate.set(true);
    state.saved = true;
}

export async function openFileWithPath(state: IEditorState, path: string) {
    if (!state.saved) {
        let conf: boolean = await invoke('confirm_unsaved');
        if (!conf) {
            return;
        }
    }

    let newContent: string = await invoke('open_file', { path: path });

    state.file = {
        filename: nameFromPath(path),
        basedir: baseDirFromPath(path),
        fullpath: path
    }
    
    state.contents = newContent;
    state.editorComp.setContent(state.contents);
    state.titleComp.setTitle(state.file.filename)

    state.saved = true;
    ignoreNextMdUpdate.set(true);
}


function nameFromPath(path: string) {
    let pathStandardised = path.replace(/\\/g, '/');


    let fileNameExt = pathStandardised.substring(pathStandardised.lastIndexOf('/'));
    let fileName = fileNameExt.substring(1, fileNameExt.lastIndexOf("."));
    return fileName;
}

function baseDirFromPath(path: string) {
    let pathStandardised = path.replace(/\\/g, '/');

    return pathStandardised.substring(0, pathStandardised.lastIndexOf('/'));
}

