// import { Post } from "../models/Post";
// const postModel: Post = new Post(0, 0, "", "", 0, "");
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "");

import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class PostClass {
    // private _errorMessage: string = "";

    public async onClickCreate(title: string, content: string): Promise<void> {
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        const successMessage: HTMLParagraphElement = document.querySelector("#successMsg")!;

        errorMessage.innerHTML = "";
        successMessage.innerHTML = "";
        try {
            if (!title || !content) {
                errorMessage.innerHTML += "You must add a title and message!\n";
                UI.unleashTheErrorPopup(true);
                const userId: string | null = sessionStorage.getItem("Session");
                if (!userId) {
                    errorMessage.innerHTML += "You must be logged in!\n";
                    UI.unleashTheErrorPopup(true);
                    // Optioneel: Haal meer gegevens van de gebruiker op
                    const user: User | undefined = await userModel.getUserById(Number(userId));
                    if (user) {
                        console.log(`Author ID: ${userId}`);
                        console.log(`Author Name: ${user.getUserName()}`);
                    }
                    else {
                        errorMessage.innerHTML += "User not found!";
                        UI.unleashTheErrorPopup(true);
                    }
                }
            }
        }
        catch (reason) {
            console.error("Error creating post!", reason);
        }
    }
}

export default PostClass;
