import { User } from "../models/User";
import { UserInfo } from "./types";

export class ProfileView {
    public view!: HTMLElement;
    public userModel!: User;

    private constructor(userModel: User) {
        const mainElement: HTMLElement | null = document.querySelector(".editProfileContainer");
        if (!mainElement) {
            console.error("Can't find element .editProfileContainer");
            return;
        }
        this.view = mainElement;
        this.userModel = userModel;
    }

    public static async initialize(): Promise<ProfileView> {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");

        if (!userId) {
            throw new Error("Username is required in the URL.");
        }

        const user: User | undefined = await User.getUserById(Number(userId));

        if (!user) {
            throw new Error("User not found.");
        }

        return new ProfileView(user);
    }

    public render(UserInfo: UserInfo): void {
        const username: HTMLInputElement = document.querySelector("#username")!;
        const email: HTMLInputElement = document.querySelector("#email")!;
        const biography: HTMLTextAreaElement = document.querySelector("#bioEditor")!;
        const dob: HTMLInputElement = document.querySelector("#dob")!;

        username.value = UserInfo.userName;
        email.value = UserInfo.userEmail;
        dob.value = UserInfo.dob || "";
        biography.value = UserInfo.bio;
    }
}
