// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::path::{Path};

use tauri::api::dialog::{self, MessageDialogBuilder, blocking};
use tauri::api::file;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![rename_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn rename_file(old_path: String, new_path: String) -> bool {

    if file_exists(&new_path) {
        let overwrite_confirmed = show_confirm_box(
			"Rename file", 
			"Renaming the file to this requires overwriting an existing file, continue?", 
			String::from("Confirm"), 
			String::from("Cancel")
		).await;

		if !overwrite_confirmed {return false}
    }

	let rename_result = fs::rename(old_path, new_path);

	//this is bad
	if rename_result.is_err() {
		return false;
	}

    return true;
}

fn file_exists(path: &String) -> bool {
    Path::new(path).exists()
}

async fn show_confirm_box(title: &str, message: &str, ok_string: String, cancel_string: String) -> bool {
	blocking::MessageDialogBuilder::new(title, message)
		.buttons(dialog::MessageDialogButtons::OkCancelWithLabels(ok_string, cancel_string))
		.kind(dialog::MessageDialogKind::Warning)
		.show()
}

//internal rename function
fn rename(old_path: String, new_path: String) {}
