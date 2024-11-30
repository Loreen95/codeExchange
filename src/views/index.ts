import { UserView } from "./UserView";
import { UserController } from "../controllers/UserController";

// Haal de UserView op via de static initialize methode
UserView.initialize()
    .then((userView: UserView) => {
        console.log("UserView initialized:", userView); // Debugging: controleer of de view juist is geïnitialiseerd
        const userController: UserController = new UserController(userView);

        // Render de gebruiker
        userController.renderUser().then(() => {
            console.log("User page rendering complete.");
        }).catch((error: unknown) => {
            console.error("An error occurred while rendering the profile page:", error);
        });
    })
    .catch((error: unknown) => {
        console.error("Error initializing UserView:", error);
    });
