// index.ts
import { User } from "../models/User";

// Functie om te controleren of een gebruiker met het gegeven emailadres al bestaat
async function checkUserEmail(email: string): Promise<void> {
    const userModel: User = new User(0, "", email, "");
    const exists: boolean | undefined = await userModel.doesUserExistForEmail(email);

    if (exists) {
        console.error("Dit emailadres is al in gebruik!", email);
    }
    else {
        console.log("Dit emailadres is nog niet gevonden");
    }
}

// Functie om een gebruiker te vinden door het id
async function main(id: number): Promise<void> {
    // Haal de gebruiker op met het gegeven id
    const userModel: User = new User(id, "", "", "");
    const user: User | undefined = await userModel.getUserById(id);

    if (user) {
        // Als de gebruiker gevonden is, toon de gegevens
        console.log(`Gebruiker gevonden: \nID: ${user.getId()} \nUsername: ${user.getUserName()} \nEmail: ${user.getEmail()}`);
    }
    else {
        // Als de gebruiker niet bestaat, toon een foutmelding
        console.log("Geen gebruiker gevonden met het opgegeven id.");
    }
}

// Roep de main functie aan om het proces te starten met een voorbeeld id
await main(1);

// Roep de functie aan met een voorbeeld-email
await checkUserEmail("lisa.hakhoff@hva.nl");
