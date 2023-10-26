use std::{fs::{File, OpenOptions}, io::{Write, Read}, path::Path};

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

//this function is terrible and unwraps all errors
//ill replace it with something better later
pub fn get_all_md_files(dir: &String) -> Vec<String> {
    let mut ret_vec = Vec::<String>::new();

    let paths = std::fs::read_dir(dir).unwrap();

    for entry in paths {
        let path = entry.unwrap().path();

        if path.is_dir() && path.extension().unwrap() == "md" {
            ret_vec.push(String::from(path.to_str().unwrap()))
        }
    }

    return ret_vec;
}
