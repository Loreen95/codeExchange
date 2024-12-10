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
        console.log("UserInfo.dob:", UserInfo.dob);

        const username: HTMLInputElement = document.querySelector("#username")!;
        const email: HTMLInputElement = document.querySelector("#email")!;
        const biography: HTMLTextAreaElement = document.querySelector("#bioEditor")!;
        const dob: HTMLInputElement = document.querySelector("#dob")!;

        username.value = UserInfo.userName;
        email.value = UserInfo.userEmail;
        dob.value = this.formatDateForInput(UserInfo.dob);
        biography.value = UserInfo.bio;
    }

    public formatDateForInput(dob: string | Date | null): string {
        if (!dob || dob === "Niet beschikbaar" || dob === "00-00-0000") {
            return "";
        }
        if (dob instanceof Date) {
            return dob.toISOString().split("T")[0];
        }
        if (typeof dob === "string") {
            if (dob.includes("T")) {
                return dob.split("T")[0];
            }
            if (dob.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return dob;
            }
            const dateParts: string[] = dob.split("/");
            if (dateParts.length === 3) {
                const [month, day, year] = dateParts;
                return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            }
        }
        return ""; // Ongeldig formaat
    }
}
