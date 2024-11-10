import { UserController } from "../controllers/UserController";

// Maak een instantie van de UserController aan en haal alle users op
const userController: UserController = new UserController();
await userController.getAllUsers();
