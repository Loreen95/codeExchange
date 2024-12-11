import { ProfileView } from "../views/profileView";
import { UserInfo } from "../views/types";

import { User } from "../models/User";

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
    public async vanquishUserToShadowRealm(userId: number): Promise<void> {
        if (userId) {
            console.log("trigger 2");
            await User.delete(userId);
        }
    }
}
