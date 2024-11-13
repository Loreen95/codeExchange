import { utils } from "@hboictcloud/api";
import UserInterfaceClass from "./interface";
const UI: UserInterfaceClass = new UserInterfaceClass();
import { User } from "../models/User";
const userModel: User = new User("", "", "", 0);

const isolatedNodelistElement: NodeList = await utils.fetchAndParseHtml("../../default.html");
const arraybasic: string[] = Array.from(isolatedNodelistElement).map(element => (element as HTMLElement).outerHTML);

const headerofpage: HTMLDivElement = document.querySelector(".navigationBar")!;
const strayElements: HTMLDivElement = document.querySelector(".vagabondElements")!;
const footerContent: HTMLDivElement = document.querySelector(".footerFilin")!;
headerofpage.innerHTML = String(arraybasic[1]);
strayElements.innerHTML = String(arraybasic[3]);
footerContent.innerHTML = String(arraybasic[5]);

const loggedUser: string | null = sessionStorage.getItem("session");
if (loggedUser) {
    UI.adjustPageToLoginStatus(true);
}
else {
    UI.adjustPageToLoginStatus(false);
}

const userNameOnPage: NodeListOf<HTMLElement> = document.querySelectorAll("#injectUsernameHere");
for (let l: number = 0; l < userNameOnPage.length; l++) {
    const userID: string | null = sessionStorage.getItem("session");
    const userIdToNumber: number | null = userID ? parseInt(userID, 10): null;
    const userInfo: User | null = await userModel.getUserById(userIdToNumber);
    const userName: string | undefined = userInfo?.getUserName();
    userNameOnPage[l].innerHTML = `${userName}`;
}

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
