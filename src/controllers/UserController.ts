import { Controller } from "./Controller";
import { UserView } from "../views/UserView";
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "");

export class UserController extends Controller {
    public userView: UserView;

    public constructor(userView: UserView) {
        super(userView.view);
        this.userView = userView;
    }

    public async renderUser(): Promise<void> {
        try {
            this.userView.render();
            await this.render();
        }
        catch (reason) {
            console.error("Error rendering Homepage: ", reason);
        }
    }

    public async updateUser(username: string, email: string, password: string, expertise: string, yearsExperience: number, dob: Date, userId: number): Promise<void> {
        try {
            const result: boolean = await userModel.update(username, email, password, expertise, yearsExperience, dob, userId);
            if (result) {
                this.userView.render();
            }
        }
        catch (reason) {
            console.error("Error while updating user", reason);
        }
    }
}
