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
        const errorMessages: { [key: string]: string } = this.getErrorMessages();
        const userId: number = this._profileView.userModel.userId || 0;
        const userEmail: string = this._profileView.userModel.email || errorMessages.unknownEmail;
        const userName: string = this._profileView.userModel.userName || errorMessages.unknownUser;
        const dob: string = this._profileView.userModel.dob
            ? this._profileView.userModel.dob instanceof Date
                ? this._profileView.userModel.dob.toISOString().split("T")[0]
                : this._profileView.userModel.dob
            : errorMessages.unknownDob;
        const yearsExperience: string = this._profileView.userModel.yearsExperience || "0";
        const yearsExperienceDisplay: string = yearsExperience === "0" ? errorMessages.unknownExperience : yearsExperience;
        const bio: string = this._profileView.userModel.bio || errorMessages.unknownBio;
        const stringedTimeAndDate: string = this._profileView.userModel.createdAt
            ? this._profileView.userModel.createdAt instanceof Date
                ? this._profileView.userModel.createdAt.toISOString().replace("T", " ").split(".")[0]
                : this._profileView.userModel.createdAt
            : errorMessages.unknownDateTime;
        const expertise: string = this._profileView.userModel.expertise || errorMessages.unknownExpertise;
        const foto: string = this._profileView.userModel.foto || errorMessages.noPhoto;
        return {
            userId,
            userEmail,
            userName,
            dob,
            expertise,
            yearsExperience,
            yearsExperienceDisplay,
            bio,
            stringedTimeAndDate,
            foto,
        };
    }

    private getErrorMessages(): { [key: string]: string } {
        const language: string = sessionStorage.getItem("lang") || "en";
        // Foutmeldingen voor de verschillende talen
        const messages: {
            en: { unknownEmail: string; unknownUser: string; unknownDob: string; unknownBio: string; unknownDateTime: string; unknownExperience: string; unknownExpertise: string; noPhoto: string };
            nl: { unknownEmail: string; unknownUser: string; unknownDob: string; unknownBio: string; unknownDateTime: string; unknownExperience: string; unknownExpertise: string; noPhoto: string };
        } = {
            en: {
                unknownEmail: "Unknown",
                unknownUser: "Unknown user",
                unknownDob: "Not available",
                unknownBio: "No biography available",
                unknownDateTime: "Unknown date and time",
                unknownExperience: "No experience known",
                unknownExpertise: "No expertise",
                noPhoto: "No photo",
            },
            nl: {
                unknownEmail: "Onbekend",
                unknownUser: "Onbekende gebruiker",
                unknownDob: "Niet beschikbaar",
                unknownBio: "Geen biografie beschikbaar",
                unknownDateTime: "Onbekende datum en tijd",
                unknownExperience: "Geen ervaring bekend",
                unknownExpertise: "Geen expertise",
                noPhoto: "Geen foto",
            },
        };
        return messages[language as "en" | "nl"];
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

    public async updateRecords(givenUsername: string, givenEmail: string, givenDob: string, givenBio: string, givenExperience: string, givenExpertise: string, foto: string): Promise<void> {
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
                const success: boolean = await this._profileView.userModel.update(givenUsername, givenEmail, givenDob, givenBio, givenExperience, givenExpertise, userId, foto);

                if (success) {
                    successMessage.innerHTML = "The records have been updated";
                    UI.successMessagePopup(true);
                    await new Promise(r => setTimeout(r, 2000)).then(() => {
                        window.location.href = `http://localhost:3000/profile?user=${sessionStorage.getItem("session")}`;
                    });
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
