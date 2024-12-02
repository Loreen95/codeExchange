import { Controller } from "./Controller";
import { UserView } from "../views/UserView";

export interface UserInfo {
    userId: number;
    userEmail: string;
    userName: string;
    dob: string;
    expertise: string | undefined;
    experience: number;
    stringedTimeAndDate: string;
}

export class UserController extends Controller {
    public userView: UserView;

    public constructor(userView: UserView) {
        super(userView.view);
        this.userView = userView;
    }

    public getUserInfo(): UserInfo {
        const userId: number = this.userView.userModel.userId;
        const userEmail: string = this.userView.userModel.email;
        const userName: string = this.userView.userModel.userName;
        const dob: string = String(this.userView.userModel.dob).slice(8, 10) + "-" + String(this.userView.userModel.dob).slice(5, 7) + "-" + String(this.userView.userModel.dob).slice(0, 4);
        const experience: number = (Number(this.userView.userModel.experience));
        const expertise: string | undefined = this.userView.userModel.expertise;
        const stringedTimeAndDate: string = String(this.userView.userModel.createdAt).slice(8, 10) + "-" + String(this.userView.userModel.createdAt).slice(5, 7) + "-" + String(this.userView.userModel.createdAt).slice(0, 4) + " | " + String(this.userView.userModel.createdAt).slice(11, 19);
        return {
            userId,
            userEmail,
            userName,
            dob,
            experience,
            expertise,
            stringedTimeAndDate,
        };
    }

    public async renderUser(): Promise<void> {
        try {
            const userInfo: UserInfo = this.getUserInfo();
            this.userView.render(userInfo);
            await this.render();
        }
        catch (reason) {
            console.error("Error rendering Userpage: ", reason);
        }
    }
}
