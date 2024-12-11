import { Controller } from "./Controller";
import { UserView } from "../views/UserView";
import { UserInfo } from "../views/types";

export class UserController extends Controller {
    public userView: UserView;

    public constructor(userView: UserView) {
        super(userView.view);
        this.userView = userView;
    }

    public async renderUser(): Promise<void> {
        try {
            const userInfo: UserInfo = this.getUserInfo();
            await this.userView.render(userInfo);
            await this.render();
        }
        catch (reason) {
            console.error("Error rendering Userpage: ", reason);
        }
    }

    public getUserInfo(): UserInfo {
        const userId: number = this.userView.userModel.userId || 0;
        const userEmail: string = this.userView.userModel.email || "Onbekend";
        const userName: string = this.userView.userModel.userName || "Onbekende gebruiker";
        const dob: string = this.userView.userModel.dob
            ? String(this.userView.userModel.dob).slice(8, 10) +
            "-" +
            String(this.userView.userModel.dob).slice(5, 7) +
            "-" +
            String(this.userView.userModel.dob).slice(0, 4)
            : "Niet beschikbaar";
        const experience: number = this.userView.userModel.experience || 0;
        const bio: string = this.userView.userModel.bio || "Geen biografie beschikbaar";
        const stringedTimeAndDate: string = this.userView.userModel.createdAt
            ? String(this.userView.userModel.createdAt).slice(8, 10) +
            "-" +
            String(this.userView.userModel.createdAt).slice(5, 7) +
            "-" +
            String(this.userView.userModel.createdAt).slice(0, 4) +
            " | " +
            String(this.userView.userModel.createdAt).slice(11, 19)
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
}
