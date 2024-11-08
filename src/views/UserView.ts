// import { UserModel } from "../models/UserModel";
import { User } from "../controllers/UserController";
/**
 * Dit is de view, hierbij worden de gegevens weergegeven
 */
export class UserView {
    public render(users: User[]): void {
        users.forEach(user => {
            console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
        });
    }
}
