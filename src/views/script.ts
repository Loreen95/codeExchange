// Hellogain individual whose alledgidly a human being, this here file houses stuff every page needs as a default
// This links this file to all other files it needs to interact with. And instanciates a few objects(classes).
import { LogoutClass } from "../controllers/LogoutController";
import UserInterfaceClass from "./interface";
import { utils } from "@hboictcloud/api";
import { User } from "../models/User";
const UI: UserInterfaceClass = new UserInterfaceClass();
const userModel: User = new User("", "", "", 0);
const logout: LogoutClass = new LogoutClass();

// this collects all information from the defaut html page and malforms it into a horrific nodelist for later use
const isolatedNodelistElement: NodeList = await utils.fetchAndParseHtml("../../default.html");
const stringifiedNodes: string[] = Array.from(isolatedNodelistElement).map(element => (element as HTMLElement).outerHTML);

// and this injects the data from that nodelist into every page that needs it
const strayElements: HTMLDivElement = document.querySelector(".vagabondElements")!;
const headerofpage: HTMLDivElement = document.querySelector(".navigationBar")!;
const footerContent: HTMLDivElement = document.querySelector(".footerFilin")!;
headerofpage.innerHTML = String(stringifiedNodes[1]);
strayElements.innerHTML = String(stringifiedNodes[3]);
footerContent.innerHTML = String(stringifiedNodes[5]);

// this logout button is here because we had to make it availible everywhere. And it logs you out
const logoutBttn: HTMLLinkElement = document.querySelector(".loggingOut")!;
logoutBttn.addEventListener("click", () => {
    logout.logoutFunction();
});

// this activates a method that chainges a few elements based on the login status of the user
const loggedUser: string | null = sessionStorage.getItem("session");
if (loggedUser) {
    UI.adjustPageToLoginStatus(true);
}
else {
    UI.adjustPageToLoginStatus(false);
}

// This places the username wherever it should appear.
const userNameOnPage: NodeListOf<HTMLElement> = document.querySelectorAll("#injectUsernameHere");
for (let l: number = 0; l < userNameOnPage.length; l++) {
    const usersName: string | undefined = (await userModel.getUserById(Number(sessionStorage.getItem("session"))))?.getUserName();
    userNameOnPage[l].innerHTML = `${usersName}`;
}

// this exists to allow the foldout menu to work.
const boLeftButtn: HTMLButtonElement = document.querySelector("#foldoutBttn")!;
boLeftButtn.addEventListener("click", () => {
    UI.shutterSlide();
});

// And this is a feature that lets you unhide and hide a password
const passwordEyeButton: HTMLElement = document.querySelector(".hideBttn")!;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (passwordEyeButton) {
    passwordEyeButton.addEventListener("click", () => {
        UI.revealAndHidePass();
    });
}

const passwordEyeButtonAgain: HTMLElement = document.querySelector(".unHideBttn")!;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (passwordEyeButtonAgain) {
    passwordEyeButtonAgain.addEventListener("click", () => {
        UI.revealAndHidePass();
    });
}
