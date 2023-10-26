use std::{fs::{File, OpenOptions, ReadDir}, io::{Write, Read}, path::Path};

pub fn write_file(path: &str, content: &str) -> std::io::Result<()> {
    let file = File::create(path);

    match file {
        Ok(mut f) => {f.write_all(content.as_bytes()); return Ok(())}
        Err(E) => return Err(E),
    }
}

pub fn read_file(path: &str) -> std::io::Result<String> {
    let file = OpenOptions::new().read(true).open(path);
    let mut read_buf = String::new();

    if file.is_err() {
        let err = file.unwrap_err();
        return Err(err);
    }

    let read_result = file?.read_to_string(&mut read_buf);

    if read_result.is_err() {
        let err = read_result.unwrap_err();
        return Err(err);
    }
    return Ok(read_buf);
}

pub fn file_exists(path: &String) -> bool {
    Path::new(path).exists()
}

pub fn get_files_with_ext(dir: &String, ext: &str) -> Vec<String> {
    let mut ret_vec = Vec::<String>::new();

    let path_result = std::fs::read_dir(dir);

    let paths: ReadDir;
    match path_result {
        Ok(rd) => paths = rd, 
        Err(e) => {
            ret_vec.push(e.to_string());
            return ret_vec;
        }
    }

    for entry in paths {
        match entry {
            Ok(e) => {
                let path = e.path();
                let extension = match path.extension() {
                    Some(ext) => { 
                        match ext.to_str() {
                            Some(s) => s,
                            None => "",
                        }
                    },
                    None => ""
                };
                if !path.is_dir() && extension == ext {
                    match path.to_str() {
                        Some(s) => ret_vec.push(String::from(s)),
                        None => continue,
                    }
                }
            }
            Err(e) => {
                ret_vec.push(e.to_string())
            }
        }
    }

    return ret_vec;
}
