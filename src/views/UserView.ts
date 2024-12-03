import { UserInfo } from "../controllers/UserController";
import { User } from "../models/User";

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
        const userModel: User = new User(0, "", "", "");
        const username: string | null = userUrl.get("user");
        if (!username) {
            throw new Error("Username is required in the URL.");
        }
        const user: User | undefined = await userModel.getUserById(Number(username));
        console.log(user);
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
            <p>Expertise: ${userInfo.bio}</p>
            <p>Member since: ${userInfo.stringedTimeAndDate} </p>
        `;
        const inserUsernamesHere: NodeListOf<HTMLHeadingElement> = document.querySelectorAll("#insertNameHere");
        for (let i: number = 0; i < inserUsernamesHere.length; i++) {
            inserUsernamesHere[i].innerText = String(userInfo.userName);
        }
        document.querySelector("#insertBirthdayHere")!.innerHTML = String(userInfo.dob);
        document.querySelector("#insertEmailHere")!.innerHTML = String(userInfo.userEmail);
        document.querySelector("#insertBiographyHere")!.innerHTML = String(userInfo.bio);
        // document.querySelector("#insert")!.innerHTML = String(userInfo.);
    }
}
