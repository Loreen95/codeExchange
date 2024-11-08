import UserInterfaceClass from "./interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

UI.ajustPageToLoginStatus(true);

const boLeftButtn: HTMLButtonElement = document.querySelector("#foldoutBttn")!;
boLeftButtn.addEventListener("click", () => {
    UI.shutterSlide();
});

import { api } from "@hboictcloud/api";

try {
    api.configure({
        url: "https://api.hbo-ict.cloud",
        apiKey: VITE_HBOICTCLOUD_APIKEY,
        database: VITE_HBOICTCLOUD_DATABASE,
        environment: VITE_HBOICTCLOUD_ENVIRONMENT,
    });
}
catch (reason) {
    console.error(reason);
}

console.log("o");
console.log(api.queryDatabase("SELECT `username` FROM `users` WHERE `id` = 2"));
console.log("o");

// console.log(UI.anguish("Jikitiki Yupa Yuba"));

// const users: string[] = ["Sevellus Au Juliai", "Neveliuss Au Loon", "The spitefull one", "reptile"];

// reflectionOfPriorJoy.echo(users);
