import { User } from "../models/User";

async function checkUserEmail(email: string): Promise<void> {
    const userModel = new User ("", email, "");
    const exists = await userModel.doesUserExistForEmail(email);
    if (exists) {
        console.error("Dit emailadres is al in gebruik!");
    }
    else {
        console.log("Dit emailadres is nog niet gevonden");
    }
}

// Roep de functie aan met een voorbeeld-email
checkUserEmail("lisa.hakhoff@hva.nl");
