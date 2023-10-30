
![Logo](https://raw.githubusercontent.com/emmalexandria/zenwriter_design/main/zenwriterWordmark.png?token=GHSAT0AAAAAACIA7G3ZXVXZW5ZQDQGVOVL4ZJVLI5Q)


# ZenWriter
**A simple markdown editor that gets out of your way**

It's a text editor for those that want the ability to write formatted Markdown documents with absolutely no distraction.

It consumes < 200mb of memory, nearly no CPU, and starts up near instantly. Builds are available for MacOS, Windows, and Linux in the release section.

Built in [Tauri](https://tauri.app/) and [Sveltekit](https://kit.svelte.dev) using [Milkdown](https://milkdown.dev) for the editor.

## Screenshots

![Light mode](https://raw.githubusercontent.com/emmalexandria/zenwriter_design/main/screenshot%20zenwriter%201.png)
![Dark mode](https://raw.githubusercontent.com/emmalexandria/zenwriter_design/main/screenshot%20zenwriter%202.png)


## Installation

Binaries for MacOS, Windows, and Linux are available in the releases section (soon).

ZenWriter has no need for an installation directory, but there are installers available in `.dmg` and `.exe`.

### Building from source
To build from source, you'll require Rust and NodeJS. To build this app, clone the repository and then run `npm run tauri build`. The binaries can be found in /tauri-src/target/release.

## Roadmap
This repository went public at what I consider to be the V1.0 release. There are still outstanding  bugs & issues, but for now I need some time away from this project. As of right now, here are the unresolved bugs and features: 

- Bug with saved indicator not working when file is saved with a dialog
- Lack of file associations (waiting for Tauri docs on that one)
- Lack of support for keybind based saving
- Lack of saving of preferences
- No responsive scaling of text sizes to window sizes (potentially not needed)

## License

[MIT](https://choosealicense.com/licenses/mit/)

