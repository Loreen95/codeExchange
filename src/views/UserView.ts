import { UserInfo } from "../controllers/UserController";
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "", "", new Date(0), 0, new Date(0));

export class UserView {
    public view!: HTMLElement; // ! means always initialize (temp solution)
    public userModel!: User; // ! means always initialize (temp solution)

    private constructor(userModel: User) {
        const mainElement: HTMLElement | null = document.querySelector("#profileInfo");

        if (!mainElement) {
            console.error("Can't find element profileInfo");
            return;
        }
        this.view = mainElement;
        this.userModel = userModel;
    }

    public static async initialize(): Promise<UserView> {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const username: string | null = userUrl.get("user");
        if (!username) {
            throw new Error("Username is required in the URL.");
        }
        const user: User | undefined = await userModel.getUserById(Number(username));
        if (!user) {
            throw new Error("User not found.");
        }
        return new UserView(user);
    }

    public render(userInfo: UserInfo): void {
        // Gebruik de userInfo parameter om de gegevens daadwerkelijk weer te geven
        this.view.innerHTML = `
            <h1>Welcome, ${userInfo.userName}!</h1>
            <p>Your ID is ${userInfo.userId}.</p>
            <p>Email: ${userInfo.userEmail}</p>
            <p>Birthday: ${userInfo.dob}</p>
            <p>Experience: ${userInfo.experience}</p>
            <p>Expertise: ${userInfo.expertise}</p>
            <p>Member since: ${userInfo.stringedTimeAndDate} </p>
        `;
    }
}
