import "../database/database";
import UserInterfaceClass from "./interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

UI.ajustPageToLoginStatus(true);

const boLeftButtn: HTMLButtonElement = document.querySelector("#foldoutBttn")!;
boLeftButtn.addEventListener("click", () => {
    UI.shutterSlide();
});

// console.log("o");
// console.log(api.queryDatabase("SELECT `username` FROM `users` WHERE `id` = 1"));
// console.log("o");

// const stuff = api.queryDatabase("SELECT `username` FROM `users` WHERE `id` = 2");

// console.log(stuff.username);

// console.log(UI.anguish("Jikitiki Yupa Yuba"));

// const users: string[] = ["Sevellus Au Juliai", "Neveliuss Au Loon", "The spitefull one", "reptile"];

// reflectionOfPriorJoy.echo(users);
