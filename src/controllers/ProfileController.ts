import { ProfileView } from "../views/profileView";
import { UserInfo } from "../views/types";
import { User } from "../models/User";

import { LogoutClass } from "../controllers/LogoutController";
import UserInterfaceClass from "../views/interface";

const UI: UserInterfaceClass = new UserInterfaceClass();
const logout: LogoutClass = new LogoutClass();

export class ProfileController {
    private _profileView: ProfileView;

    public constructor(profileView: ProfileView) {
        this._profileView = profileView;
    }

    /**
     * This function renders the view of the profile
     */
    public renderProfile(): void {
        try {
            const userInfo: UserInfo = this.getUserInfo();
            this._profileView.render(userInfo);
        }
        catch (reason) {
            console.error("Error rendering Userpage: ", reason);
        }
    }

    /**
     * This function gathers the user information
     * @returns UserInfo
     */
    public getUserInfo(): UserInfo {
        const userId: number = this._profileView.userModel.userId || 0;
        const userEmail: string = this._profileView.userModel.email || "Onbekend";
        const userName: string = this._profileView.userModel.userName || "Onbekende gebruiker";
        const dob: string = this._profileView.userModel.dob
            ? this._profileView.userModel.dob instanceof Date
                ? this._profileView.userModel.dob.toISOString().split("T")[0]
                : this._profileView.userModel.dob
            : "Niet beschikbaar";
        const yearsExperience: number = this._profileView.userModel.yearsExperience || 0;
        const bio: string = this._profileView.userModel.bio || "Geen biografie beschikbaar";
        const stringedTimeAndDate: string = this._profileView.userModel.createdAt
            ? this._profileView.userModel.createdAt instanceof Date
                ? this._profileView.userModel.createdAt.toISOString().replace("T", " ").split(".")[0]
                : this._profileView.userModel.createdAt
            : "Onbekende datum en tijd";
        const expertise: string = this._profileView.userModel.expertise || "Geen expertise";
        return {
            userId,
            userEmail,
            userName,
            dob,
            expertise,
            yearsExperience,
            bio,
            stringedTimeAndDate,
        };
    }

    /**
     * This function deletes the user account
     */
    public async vanquishUserToShadowRealm(userId: number, passWord: string, userPassPhrase: string): Promise<void> {
        if (userId) {
            if (passWord === userPassPhrase) {
                const successMessage: HTMLParagraphElement = document.querySelector("#successMsg")!;
                successMessage.innerHTML = "You have made a grave mistake";
                UI.successMessagePopup(true);
                // await User.delete(userId);
                await User.delete(userId).then(() => {
                    logout.logoutFunction();
                });
            }
            else {
                const UI: UserInterfaceClass = new UserInterfaceClass();
                const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
                const passPhrase: HTMLInputElement = document.querySelector(".confirmPassBeforeExecution")!;
                UI.unleashTheErrorPopup(true);
                errorMessage.innerText = "Incorrect password";
                passPhrase.style.border = "solid 3px red";
            }
        }
    }

    public async updateRecords(givenUsername: string, givenEmail: string, givenDob: string, givenBio: string, givenExperience: number, givenExpertise: string): Promise<void> {
        const successMessage: HTMLParagraphElement = document.querySelector("#successMsg")!;
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        successMessage.innerHTML = "";
        errorMessage.innerHTML = "";
        try {
            const userIdString: string | null = sessionStorage.getItem("session");
            if (!userIdString) {
                console.error("No user found in session storage.");
                return;
            }
            const userId: number = Number(userIdString);
            if (isNaN(userId)) {
                console.error("Invalid user ID in session storage.");
                return;
            }
            const user: User | undefined = await User.getUserById(userId);
            if (!user) {
                console.error("Cannot find user with ID:", userId);
                return;
            }

            if (!givenUsername) {
                errorMessage.innerHTML = "You must provide a username\n";
                UI.unleashTheErrorPopup(true);
                UI.successMessagePopup(false);
            }
            else if (!givenEmail) {
                errorMessage.innerHTML += "You must provide an email\n";
                UI.unleashTheErrorPopup(true);
                UI.successMessagePopup(false);
            }
            else if (!givenDob) {
                errorMessage.innerHTML += "Please provide us with your date of birth\n";
                UI.unleashTheErrorPopup(true);
                UI.successMessagePopup(false);
            }
            else if (!givenBio) {
                errorMessage.innerHTML = "We'd love to know more about you, please fill in your bio\nPlease use the following format: profession, years of experience | (Here you can put other things)";
                UI.unleashTheErrorPopup(true);
                UI.successMessagePopup(false);
            }
            else if (!givenExperience) {
                errorMessage.innerHTML = "Please tell us how many years of experience you have\n";
                UI.unleashTheErrorPopup(true);
                UI.successMessagePopup(false);
            }
            else if (!givenExpertise) {
                errorMessage.innerHTML = "Please tell us your profession";
                UI.unleashTheErrorPopup(true);
                UI.successMessagePopup(false);
            }
            else {
                const success: boolean = await this._profileView.userModel.update(givenUsername, givenEmail, givenDob, givenBio, givenExperience, givenExpertise, userId);

                if (success) {
                    successMessage.innerHTML = "The records have been updated";
                    UI.successMessagePopup(true);
                }
                else {
                    console.error("Failed to update records.");
                }
            }
        }
        catch (reason) {
            console.error("Error updating records: ", reason);
        }
    }
}
