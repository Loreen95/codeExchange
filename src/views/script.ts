import UserInterfaceClass from "./interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

const boLeftButtn: HTMLButtonElement = document.querySelector("#foldoutBttn")!;

boLeftButtn.addEventListener("click", () => {
    UI.shutterSlide();
});

// console.log(UI.anguish("Jikitiki Yupa Yuba"));

// const users: string[] = ["Sevellus Au Juliai", "Neveliuss Au Loon", "The spitefull one", "reptile"];

// reflectionOfPriorJoy.echo(users);
