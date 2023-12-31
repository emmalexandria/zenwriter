// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod files;

use std::env;
use std::fs::{self};
use std::sync::Mutex;
use fs4::FileExt;

use tauri::Window;
use tauri::api::{
    dialog::{self, blocking},
    file,
};



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            rename_file,
            save_file,
            save_file_as,
            open_file,
            open_file_prompt,
			new_file,
			confirm_unsaved,
            get_md_files_from_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn rename_file(old_path: String, new_path: String) -> bool {
    if files::file_exists(&new_path) {
        let overwrite_confirmed = show_confirm_box(
            "Rename file",
            "Renaming the file to this requires overwriting an existing file, continue?",
            String::from("Confirm"),
            String::from("Cancel"),
        )
        .await;

        if !overwrite_confirmed {
            return false;
        }
    }

    let rename_result = fs::rename(old_path, new_path);

    //this is bad
    if rename_result.is_err() {
        return false;
    }

    return true;
}

async fn show_confirm_box(
    title: &str,
    message: &str,
    ok_string: String,
    cancel_string: String,
) -> bool {
    blocking::MessageDialogBuilder::new(title, message)
        .buttons(dialog::MessageDialogButtons::OkCancelWithLabels(
            ok_string,
            cancel_string,
        ))
        .kind(dialog::MessageDialogKind::Warning)
        .show()
}

//expects the filename and the base directory seperately, returns the new path
#[tauri::command]
async fn save_file(path: String, contents: String) -> String {
    let result = files::write_file(&path, &contents);

    match result {
        Ok(()) => path,
        Err(_) => String::from(""),
    }
}

//this function could probably be way more dense but i like doing early returns instead of intense nesting
#[tauri::command]
async fn save_file_as(filename: String, contents: String) -> String {
    let path_buf = blocking::FileDialogBuilder::new()
        .add_filter(".md files", &["md"])
        .set_file_name(&filename)
        .set_title("Save Markdown file as")
        .save_file();

    let path = match path_buf {
        Some(p) => match p.to_str() {
            Some(s) => Some(String::from(s)),
            None => None,
        },
        None => None,
    };

    if path.is_none() {
        return String::from("");
    }

    match files::write_file(&path.clone().unwrap(), &contents) {
        Ok(()) => return path.unwrap(),
        Err(_) => return String::from(""),
    };
}

#[tauri::command]
async fn open_file(path: String) -> String {
    match files::read_file(&path) {
        Ok(c) => c,
        Err(_) => String::from(""),
    }
}

#[tauri::command] 
async fn open_file_prompt() -> String {
    let path_buf = blocking::FileDialogBuilder::new()
        .add_filter(".md files", &["md"])
        .set_title("Open a Markdown file")
        .pick_file();

    let path = match path_buf {
        Some(p) => match p.to_str() {
            Some(s) => Some(String::from(s)),
            None => None,
        },
        None => None,
    };

    match path {
        Some(s) => s,
        None => String::from(""),
    }
}

#[tauri::command]
async fn new_file(saved: bool) -> bool {
    if !saved {
        if !show_confirm_box(
        	"zenwriter",
        	"Creating a new file will discard your current changes. Continue?",
        	String::from("Confirm"),
        	String::from("Cancel"),
        ).await {
			return false;
		}
    }

    return true;
}

#[tauri::command]
async fn confirm_unsaved() -> bool {
	show_confirm_box(
		"zenwriter",
		"You have unsaved changes. This action will discard your changes.",
		String::from("Confirm"),
		String::from("Cancel"),
	).await
}

#[tauri::command] 
fn get_md_files_from_dir(dir: String) -> Vec<String> {
    files::get_files_with_ext(&dir, "md")
}


