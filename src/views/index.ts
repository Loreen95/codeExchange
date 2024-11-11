import { User } from "../models/User";

// De functie checkUserEmail neemt een string als argument (email) en geeft geen resultaat terug
async function checkUserEmail(email: string): Promise<void> {
    // Maak een nieuwe User instantie aan met lege velden voor username en password
    const userModel: User = new User("", email, "");
    // Verkrijg of de gebruiker bestaat op basis van het emailadres
    const exists: boolean | undefined = await userModel.doesUserExistForEmail(email);

    // Als het emailadres al in gebruik is, log een foutmelding
    if (exists) {
        console.error("Dit emailadres is al in gebruik!", email);
    }
    else {
        // Anders, log een melding dat het emailadres nog niet gevonden is
        console.log("Dit emailadres is nog niet gevonden");
    }
}

// Roep de functie aan met een voorbeeld-email
await checkUserEmail("lisa.hakhoff@hva.nl");
