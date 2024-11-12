import { utils } from "@hboictcloud/api";

try {
    // TODO: Pas de .env bestanden aan met de gegevens van HBO-ICT.Cloud
    await utils.fetchAndParseHtml("../../default.html");
    console.log(await utils.fetchAndParseHtml("../../landingspagina.html"));
}
catch (reason) {
    console.error(reason);
}

// const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;

// errorMessage.innerHTML = NodeList[3];
// console.log(Nodelist);

import UserInterfaceClass from "./interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

UI.ajustPageToLoginStatus(true);

const boLeftButtn: HTMLButtonElement = document.querySelector("#foldoutBttn")!;
boLeftButtn.addEventListener("click", () => {
    UI.shutterSlide();
});

const passwordEyeButton: HTMLElement = document.querySelector(".hideBttn")!;
passwordEyeButton.addEventListener("click", () => {
    UI.revealAndHidePass();
});

const passwordEyeButtonAgain: HTMLElement = document.querySelector(".unHideBttn")!;
passwordEyeButtonAgain.addEventListener("click", () => {
    UI.revealAndHidePass();
});

// console.log("o");
// console.log(api.queryDatabase("SELECT `username` FROM `users` WHERE `id` = 1"));
// console.log("o");

// const stuff = api.queryDatabase("SELECT `username` FROM `users` WHERE `id` = 2");

// console.log(stuff.username);

// console.log(UI.anguish("Jikitiki Yupa Yuba"));

// const users: string[] = ["Sevellus Au Juliai", "Neveliuss Au Loon", "The spitefull one", "reptile"];

// reflectionOfPriorJoy.echo(users);
