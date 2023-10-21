// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::{PathBuf, self};

use tauri::api::dialog;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![open_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

//unused because i suck with rust closures and couldnt work out how to get the value out of the closure
#[tauri::command]
fn open_file() {
  let dialog = dialog::FileDialogBuilder::new();
  
  dialog
    .add_filter("Markdown files", &["md", "txt"])
    .set_title("Open markdown file")
    .pick_file(|path_buf| {
      
    });

  



}