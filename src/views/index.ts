import { ProfileController } from "../controllers/ProfileController";
import { UserController } from "../controllers/UserController";
import { ProfileView } from "../../wwwroot/profileView";
import { UserView } from "./UserView";

async function initializeViews(): Promise<void> {
    try {
        const userView: UserView = await UserView.initialize();
        const userController: UserController = new UserController(userView);

        await userController.renderUser();
    }
    catch (error) {
        console.error("Error initializing or rendering UserView:", error);
    }

    try {
        const profileView: ProfileView = await ProfileView.initialize();
        const profileController: ProfileController = new ProfileController(profileView);

        profileController.renderProfile();
    }
    catch (error) {
        console.error("An error occurred while rendering the profile edit:", error);
    }
}

await initializeViews();
