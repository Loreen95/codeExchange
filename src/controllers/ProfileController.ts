import { ProfileView } from "../views/profileView";
import { UserInfo } from "../views/types";

export class ProfileController {
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
        const userId: number = this.profileView.userModel.userId || 0; // Default: 0
        const userEmail: string = this.profileView.userModel.email || "Onbekend"; // Default: "Onbekend"
        const userName: string = this.profileView.userModel.userName || "Onbekende gebruiker"; // Default: "Onbekende gebruiker"
        const dob: string = this.profileView.userModel.dob
            ? String(this.profileView.userModel.dob).slice(8, 10) +
            "-" +
            String(this.profileView.userModel.dob).slice(5, 7) +
            "-" +
            String(this.profileView.userModel.dob).slice(0, 4)
            : "Niet beschikbaar"; // Default: "Niet beschikbaar"
        const experience: number = this.profileView.userModel.experience || 0; // Default: 0
        const bio: string = this.profileView.userModel.bio || "Geen biografie beschikbaar"; // Default: "Geen biografie beschikbaar"
        const stringedTimeAndDate: string = this.profileView.userModel.createdAt
            ? String(this.profileView.userModel.createdAt).slice(8, 10) +
            "-" +
            String(this.profileView.userModel.createdAt).slice(5, 7) +
            "-" +
            String(this.profileView.userModel.createdAt).slice(0, 4) +
            " | " +
            String(this.profileView.userModel.createdAt).slice(11, 19)
            : "Onbekende datum en tijd"; // Default: "Onbekende datum en tijd"

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
}
