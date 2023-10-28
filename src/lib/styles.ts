import { writable, get } from "svelte/store";

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