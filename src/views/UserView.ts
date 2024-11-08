import { UserModel } from "../models/UserModel";

/**
 * Dit is de view, hierbij worden de gegevens weergegeven
 */
export class UserView {
    public render(user: UserModel): void {
        console.log(`Gebruiker ID: ${user.getId()}`);
        console.log(`Email: ${user.getEmail()}`);
    }
}
