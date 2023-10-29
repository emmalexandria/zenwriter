//this probably doesnt play well with unix, double check that once you have some builds

import {
    Editor,
    rootCtx,
    defaultValueCtx,
    editorCtx,
    schemaCtx,
    editorViewCtx
} from '@milkdown/core';


import { DOMSerializer } from '@milkdown/prose/model';

export function nameFromPath(path: string) {
    let pathStandardised = path.replace(/\\/g, '/');

        
    let fileNameExt = pathStandardised.substr(pathStandardised.lastIndexOf('/')+1);
    let fileName = fileNameExt.substr(0,fileNameExt.lastIndexOf("."));
    return fileName;
}

export function baseDirFromPath(path: string) {
    let pathStandardised = path.replace(/\\/g, '/');

    return pathStandardised.substr(0, pathStandardised.lastIndexOf('/'));
}


export function baseDirName(basedir: string) {
    return basedir.substr(basedir.lastIndexOf('/'));
}



