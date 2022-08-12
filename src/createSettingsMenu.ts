import * as document_props from "./json/document_props.json";

export default function createSettingsMenu() {
    let body = document.getElementsByTagName("body")[0];
    let div = document.createElement("div");
    body.appendChild(div);
    div.classList.add("settings-container")
}