import { ProfileView } from "../views/profileView";
import { UserInfo } from "../views/types";
import UserInterfaceClass from "../views/interface";
import { LogoutClass } from "../controllers/LogoutController";
import { User } from "../models/User";

const logout: LogoutClass = new LogoutClass();

export class ProfileController {
    private _userModel: User | undefined;

    private profileView: ProfileView;

    public constructor(profileView: ProfileView) {
        this.profileView = profileView;
    }

    public renderProfile(): void {
        try {
            const userInfo: UserInfo = this.getUserInfo();
            this.profileView.render(userInfo);
            // console.log("User page successfully rendered!");
        }
        catch (reason) {
            console.error("Error rendering Userpage: ", reason);
        }
    }

    public getUserInfo(): UserInfo {
        const userId: number = this.profileView.userModel.userId || 0;
        const userEmail: string = this.profileView.userModel.email || "Onbekend";
        const userName: string = this.profileView.userModel.userName || "Onbekende gebruiker";
        const dob: string = this.profileView.userModel.dob
            ? this.profileView.userModel.dob instanceof Date
                ? this.profileView.userModel.dob.toISOString().split("T")[0]
                : this.profileView.userModel.dob
            : "Niet beschikbaar";
        const experience: number = this.profileView.userModel.experience || 0;
        const bio: string = this.profileView.userModel.bio || "Geen biografie beschikbaar";
        const stringedTimeAndDate: string = this.profileView.userModel.createdAt
            ? this.profileView.userModel.createdAt instanceof Date
                ? this.profileView.userModel.createdAt.toISOString().replace("T", " ").split(".")[0]
                : this.profileView.userModel.createdAt
            : "Onbekende datum en tijd";

        return {
            userId,
            userEmail,
            userName,
            dob,
            experience,
            bio,
            stringedTimeAndDate,
        };
    }

    /**
     * putThisAccountToTheSword
     */
    public async vanquishUserToShadowRealm(userId: number, passWord: string, userPassPhrase: string): Promise<void> {
        if (userId) {
            if (passWord === userPassPhrase) {
                await User.delete(userId);
                logout.logoutFunction();
            }
            else {
                const UI: UserInterfaceClass = new UserInterfaceClass();
                const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
                const passPhrase: HTMLInputElement = document.querySelector(".confirmPassBeforeExecution")!;
                console.log(`"${passWord}" was the awnser and "${userPassPhrase}" was provided`);
                UI.unleashTheErrorPopup(true);
                errorMessage.innerText = "Incorrect password";
                passPhrase.style.border = "solid 3px red";
            }
        }
    }
}
