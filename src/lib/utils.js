//this probably doesnt play well with unix, double check that once you have some builds
export function nameFromPath(path) {
    let pathStandardised = path.replace(/\\/g, '/');

        
    let fileNameExt = pathStandardised.substr(pathStandardised.lastIndexOf('/')+1);
    let fileName = fileNameExt.substr(0,fileNameExt.lastIndexOf("."));
    return fileName;
}

export function baseDirFromPath(path) {
    console.log(typeof(path))
    let pathStandardised = path.replace(/\\/g, '/');

    return pathStandardised.substr(0, pathStandardised.lastIndexOf('/'));
}