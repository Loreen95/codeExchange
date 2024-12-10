import { ProfileController } from "../controllers/ProfileController";
import { UserController } from "../controllers/UserController";
import { ProfileView } from "./profileView";
import { UserView } from "./UserView";

async function initializeViews(): Promise<void> {
    try {
        const userView: UserView = await UserView.initialize();
        // console.log("UserView initialized:", userView);
        const userController: UserController = new UserController(userView);

        await userController.renderUser();
        // console.log("User page rendering complete.");
    }
    catch (error) {
        console.error("Error initializing or rendering UserView:", error);
    }

    try {
        const profileView: ProfileView = await ProfileView.initialize();
        // console.log("Initialized ProfileView", profileView);
        const profileController: ProfileController = new ProfileController(profileView);

        profileController.renderProfile();
        // console.log("Profile rendering complete.");
    }
    catch (error) {
        console.error("An error occurred while rendering the profile edit:", error);
    }
}

await initializeViews();
