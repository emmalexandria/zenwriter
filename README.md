
![Logo](https://raw.githubusercontent.com/emmalexandria/zenwriter_design/main/zenwriterWordmark.png?token=GHSAT0AAAAAACIA7G3ZXVXZW5ZQDQGVOVL4ZJVLI5Q)


# ZenWriter
**A simple markdown editor that gets out of your way**

It's a text editor for those that want the ability to write formatted Markdown documents with absolutely no distraction.

It consumes < 100mb of memory, nearly no CPU, and starts up near instantly. Builds are available for MacOS, Windows, and Linux in the release section.

Built in [Tauri](https://tauri.app/) and [Sveltekit](https://kit.svelte.dev) using [Milkdown](https://milkdown.dev) for the editor.

## Screenshots

![App Screenshot](https://raw.githubusercontent.com/emmalexandria/zenwriter_design/main/zenwriter%20screenshot.png?token=GHSAT0AAAAAACIA7G3ZXCKDQKDEBFX2IEDUZJVLFEA)


## Installation

Binaries for MacOS, Windows, and Linux are available in the releases section.

ZenWriter has no need for an installation directory, but there are installers available in `.dmg`, `.exe`, and `.msi`. 

### Building from source
To build from source, you'll require Rust and NodeJS. To build this app, clone the repository and then run `npm run tauri build`. The binaries can be found in /tauri-src/target/release.

    
## Roadmap

- Movement of nearly all logic into Rust
- Custom colour schemes (incl syntax)
- Continuous UI improvement

## License

[MIT](https://choosealicense.com/licenses/mit/)

