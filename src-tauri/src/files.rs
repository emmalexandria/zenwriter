use std::{fs::File, io::Write, path::Path};

pub fn write_file(path: &str, content: &str) -> std::io::Result<()> {
    let file = File::create(path);

    match file {
        Ok(mut f) => {f.write_all(content.as_bytes()); return Ok(())}
        Err(E) => return Err(E),
    }
}

pub fn file_exists(path: &String) -> bool {
    Path::new(path).exists()
}