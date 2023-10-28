import { writable, get} from "svelte/store";
import {state} from "$lib/stores"

export interface IStyle {
    name: string,
    path: string,
}

export const styles = writable<IStyle[]>([
    {
        name: 'Light',
        path: '/styles/lightstyle.css' 
    },
    {
        name: 'Dark',
        path: '/styles/darkstyle.css' 
    }
])

export function getStyleFromName(name: string): IStyle {
    let styleArray = get(styles);
    //default safe return
    let returnVal = styleArray[0];

    styleArray.forEach((style) => {
        if(style.name == name) {
            returnVal = style;
        }
    })

    return returnVal;
}

const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

//this current way of doing it is jank and should be replaced once I need to implement multiple themes
export function getSystemTheme(): string {
    return darkModePreference.matches ? "Dark": "Light";
}

darkModePreference.addEventListener("change", (e) => {
    let currState = get(state);
    let style = e.matches ? "Dark" : "Light";
    state.set({...get(state), currStyle: getStyleFromName(style)});
})