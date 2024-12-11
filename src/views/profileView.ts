import { User } from "../models/User";
import { UserInfo } from "./types";
import UserInterfaceClass from "./interface";
import { ProfileController } from "../controllers/ProfileController";

const UI: UserInterfaceClass = new UserInterfaceClass();
const logout: LogoutClass = new LogoutClass();

export class ProfileView {
    public view!: HTMLElement;
    public userModel!: User;

    private constructor(userModel: User) {
        const mainElement: HTMLElement | null = document.querySelector(".editProfileContainer");
        if (!mainElement) {
            console.error("Can't find element .editProfileContainer");
            return;
        }
        this.view = mainElement;
        this.userModel = userModel;
    }

    public static async initialize(): Promise<ProfileView> {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");

        if (!userId) {
            throw new Error("Username is required in the URL.");
        }

        const user: User | undefined = await User.getUserById(Number(userId));

        if (!user) {
            throw new Error("User not found.");
        }

        return new ProfileView(user);
    }

    public render(UserInfo: UserInfo): void {
        const username: HTMLInputElement = document.querySelector("#username")!;
        const email: HTMLInputElement = document.querySelector("#email")!;
        const biography: HTMLTextAreaElement = document.querySelector("#bioEditor")!;
        const dob: HTMLInputElement = document.querySelector("#dob")!;

        username.value = UserInfo.userName;
        email.value = UserInfo.userEmail;
        dob.value = this.formatDateForInput(UserInfo.dob);
        biography.value = UserInfo.bio;
    }

    public formatDateForInput(dob: string | Date | null): string {
        if (!dob || dob === "Niet beschikbaar" || dob === "00-00-0000") {
            return "";
        }
        if (dob instanceof Date) {
            return dob.toISOString().split("T")[0];
        }
        if (typeof dob === "string") {
            if (dob.includes("T")) {
                return dob.split("T")[0];
            }
            if (dob.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return dob;
            }
            const dateParts: string[] = dob.split("/");
            if (dateParts.length === 3) {
                const [month, day, year] = dateParts;
                return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            }
        }
        return "";
    }
}

const profileView: ProfileView = await ProfileView.initialize();
const profileController: ProfileController = new ProfileController(profileView);

const eradicate: HTMLButtonElement = document.querySelector(".deleteAccountBttn")!;
const closeButtons: HTMLAnchorElement = document.querySelector(".closeConfirmPopup")!;
const closeButton2: HTMLButtonElement = document.querySelector(".closeConfirmPopup2")!;
const deathUponAccountById: HTMLButtonElement = document.querySelector("#kjilUser")!;
const passPhrase: HTMLInputElement = document.querySelector(".confirmPassBeforeExecution")!;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition

if (eradicate) {
    eradicate.addEventListener("click", () => {
        UI.revealOrHideConfirmPopup();
    });
}
if (closeButtons) {
    closeButtons.addEventListener("click", () => {
        UI.revealOrHideConfirmPopup();
        UI.unleashTheErrorPopup(false);
        passPhrase.style.border = "none";
    });
}
if (closeButton2) {
    closeButton2.addEventListener("click", () => {
        UI.revealOrHideConfirmPopup();
        UI.unleashTheErrorPopup(false);
        passPhrase.style.border = "none";
    });
}

if (deathUponAccountById) {
    deathUponAccountById.addEventListener("click", async () => {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        const dataOfPerson: User | undefined = await User.getUserById(Number(userId));
        if (dataOfPerson) {
            await profileController.vanquishUserToShadowRealm(Number(userId), dataOfPerson.password, passPhrase.value);
        }
    });
}

const apply: HTMLButtonElement | null = document.querySelector(".applyChaingesBttn");
const usernameInput: HTMLInputElement | null = document.querySelector("#username");
const emailInput: HTMLInputElement | null = document.querySelector("#email");
const dobInput: HTMLInputElement | null = document.querySelector("#dob");
const bioInput: HTMLInputElement | null = document.querySelector("#bioEditor");

if (apply && usernameInput && emailInput && dobInput && bioInput) {
    apply.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        const username: string = usernameInput.value.trim();
        const email: string = emailInput.value.trim();
        const dob: string = dobInput.value.trim();
        const bio: string = bioInput.value.trim();

        const dobFormat: string = new Date(dob).toISOString().split("T")[0];
        await profileController.updateRecords(username, email, dobFormat, bio);
    });
}
else {
    console.error("One or more form inputs were not found.");
}
