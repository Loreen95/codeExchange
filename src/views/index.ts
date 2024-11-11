import { User } from "../models/UserModel";

// 
async function checkUserEmail(email: string): Promise<void> {
    const userModel = new User ("", email, "");
    const exists = await userModel.doesUserExistForEmail(email);
}

// Roep de functie aan met een voorbeeld-email
checkUserEmail("lisa.hakhoff@hva.nl");
