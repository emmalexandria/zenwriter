import { writable } from "svelte/store";

export interface IStyle {
    name: string,
    path: string,
}

export const styles = writable<IStyle[]>([
    {
        name: 'Light',
        path: '/styles/lightmode.css' 
    }


])