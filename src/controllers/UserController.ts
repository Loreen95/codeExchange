import { Controller } from "./Controller";
import { UserView } from "../views/UserView";
import { User } from "../models/User";

export interface UserInfo {
    userId: number;
    userEmail: string;
    userName: string;
    dob: string;
    expertise: string;
    experience: number;
    stringedTimeAndDate: string;
}

export class UserController extends Controller {
    public userView: UserView;
    public user: User;

    public constructor(userView: UserView) {
        super(userView.view);
        this.userView = userView;
        this.user = new User(0, "", "", "", "", new Date(0), 0, new Date(0));
    }

    public getUserInfo(): UserInfo {
        try {
            // Haal de gegevens op via de userModel
            const userId: number = this.userView.userModel.getId();
            const userEmail: string = this.userView.userModel.getEmail();
            const userName: string = this.userView.userModel.getUserName();
            const dob: string = String(this.userView.userModel.getDob()).slice(8, 10) + "-" + String(this.userView.userModel.getDob()).slice(5, 7) + "-" + String(this.userView.userModel.getDob()).slice(0, 4);
            const experience: number = (Number(this.userView.userModel.getExperience()));
            const expertise: string = this.userView.userModel.getExpertise();
            const stringedTimeAndDate: string = String(this.userView.userModel.getCreatedAt()).slice(8, 10) + "-" + String(this.userView.userModel.getCreatedAt()).slice(5, 7) + "-" + String(this.userView.userModel.getCreatedAt()).slice(0, 4) + " | " + String(this.userView.userModel.getCreatedAt()).slice(11, 19);
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
        catch (reason) {
            console.error("Error fetching user info!", reason);
            return {
                userId: 0,
                userEmail: "",
                userName: "",
                dob: "Not Provided",
                experience: 0,
                expertise: "Not Provided",
                stringedTimeAndDate: "Unknown",
            };
        }
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
    // public async updateUser(username: string, email: string, password: string, expertise: string, yearsExperience: number, dob: Date, userId: number): Promise<void> {
    //     try {
    //         const result: boolean = await userModel.update(username, email, password, expertise, yearsExperience, dob, userId);
    //         if (result) {
    //             this.userView.render();
    //         }
    //     }
    //     catch (reason) {
    //         console.error("Error while updating user", reason);
    //     }
    // }
}
