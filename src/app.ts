import { UserController } from "./controllers/UserController";

const userController: UserController = new UserController();

// Hierbij worden gebruikers toegevoegd (de functies worden aapgeroepen)
userController.addUser("newuser@example.com", "securepassword")
    .then(() => {
        console.log("Gebruiker toegevoegd");
    })
    .catch(() => {
        console.error("Fout bij het toevoegen van gebruiker:");
    });

// Hierbij worden gebruikers weergegeven (de functies worden aangeroepen)
userController.getUserDetails(1)
    .then(() => {
        console.log("Gebruiker gevonden");
    })
    .catch(() => {
        console.log("Gebruiker niet gevonden");
    });
