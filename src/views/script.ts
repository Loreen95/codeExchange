// Hellogain individual whose alledgidly a human being, this here file houses stuff every page needs as a default
// This links this file to all other files it needs to interact with. And instanciates a few objects(classes).
import { LogoutClass } from "../controllers/LogoutController";
import UserInterfaceClass from "./interface";
import { utils } from "@hboictcloud/api";
import { User } from "../models/User";
import { LanguageClass } from "../controllers/LanguageController";

const UI: UserInterfaceClass = new UserInterfaceClass();
const userModel: User = new User(0, "", "", "");
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
else if (!loggedUser) {
    UI.adjustPageToLoginStatus(false);
}
else {
    UI.adjustPageToLoginStatus(false);
}

// This places the username wherever it should appear.
const userNameOnPage: NodeListOf<HTMLLinkElement> = document.querySelectorAll("#injectUsernameHere");
const urlToProfile: HTMLLinkElement = document.querySelector("#addUrlHere")!;
for (let l: number = 0; l < userNameOnPage.length; l++) {
    // Ophalen van de elementen
    // Ophalen van gebruikersinformatie
    const user: User | undefined = await userModel.getUserById(Number(sessionStorage.getItem("session")));
    const userName: string | undefined = user?.userName;
    const userId: number | undefined = user?.userId;
    if (userName && userId) {
        userNameOnPage[l].innerHTML = userName;
        urlToProfile.href = `profile?user=${userId}`;
    }
    else {
        console.error("Gebruiker niet gevonden of gebruikersinformatie ontbreekt.");
    }
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

const languageController: LanguageClass = new LanguageClass();
const translateBttn: HTMLLinkElement | null = document.querySelector("#translateBttn");
// Zet de standaardtaal bij het laden van de pagina
languageController.setLanguage(languageController.getLanguage());
languageController.translatePage();

if (translateBttn) {
    translateBttn.addEventListener("click", () => {
        // Haal de huidige taal op en wissel naar de andere taal
        const currentLang: string = languageController.getLanguage();
        const newLang: string = currentLang === "en" ? "nl" : "en";
        // Update de taal en vertaal de pagina
        languageController.setLanguage(newLang);
        languageController.translatePage();
    });
}
