import { utils } from "@hboictcloud/api";

const isolatedNodelistElement: NodeList = await utils.fetchAndParseHtml("../../default.html");

// eslint-disable-next-line @typescript-eslint/typedef
const arraybasic = Array.from(isolatedNodelistElement).map(element => (element as HTMLElement).outerHTML);

console.log("oooooooooooooooo");
console.log(arraybasic[5]);
console.log("oooooooooooooooo");

const headerofpage: HTMLDivElement = document.querySelector(".navigationBar")!;
headerofpage.innerHTML = String(arraybasic[1]);

const strayElements: HTMLDivElement = document.querySelector(".vagabondElements")!;
strayElements.innerHTML = String(arraybasic[3]);

const footerContent: HTMLDivElement = document.querySelector(".footerFilin")!;
footerContent.innerHTML = String(arraybasic[5]);

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
