import { Controller } from "./Controller";
import { UserView } from "../views/UserView";
import { UserInfo } from "../views/types";

export class UserController extends Controller {
    public userView: UserView;

    public constructor(userView: UserView) {
        super(userView.view);
        this.userView = userView;
    }

    public async renderUser(): Promise<void> {
        try {
            const userInfo: UserInfo = this.getUserInfo();
            await this.userView.render(userInfo);
            await this.render();
        }
        catch (reason) {
            console.error("Error rendering Userpage: ", reason);
        }
    }

    public getUserInfo(): UserInfo {
        const errorMessages: { [key: string]: string } = this.getErrorMessages();
        const userId: number = this.userView.userModel.userId || 0;
        const userEmail: string = this.userView.userModel.email || errorMessages.unknownEmail;
        const userName: string = this.userView.userModel.userName || errorMessages.unknownUser;
        const dob: string = this.userView.userModel.dob
            ? String(this.userView.userModel.dob).slice(8, 10) +
            "-" +
            String(this.userView.userModel.dob).slice(5, 7) +
            "-" +
            String(this.userView.userModel.dob).slice(0, 4)
            : errorMessages.unknownDob;
        const yearsExperience: number = this.userView.userModel.yearsExperience || 0;
        const yearsExperienceDisplay: string = yearsExperience === 0 ? errorMessages.unknownExperience : `${yearsExperience} years`;
        const bio: string = this.userView.userModel.bio || errorMessages.unknownBio;
        const stringedTimeAndDate: string = this.userView.userModel.createdAt
            ? String(this.userView.userModel.createdAt).slice(8, 10) +
            "-" +
            String(this.userView.userModel.createdAt).slice(5, 7) +
            "-" +
            String(this.userView.userModel.createdAt).slice(0, 4) +
            " | " +
            String(this.userView.userModel.createdAt).slice(11, 19)
            : errorMessages.unknownDateTime;
        const expertise: string = this.userView.userModel.expertise || errorMessages.unknownExpertise;
        const foto: string = this.userView.userModel.foto || errorMessages.noPhoto;
        return {
            userId,
            userEmail,
            userName,
            dob,
            expertise,
            yearsExperience,
            yearsExperienceDisplay,
            bio,
            stringedTimeAndDate,
            foto,
        };
    }

    private getErrorMessages(): { [key: string]: string } {
        const language: string = sessionStorage.getItem("lang") || "en";
        // Foutmeldingen voor de verschillende talen
        const messages: {
            en: { unknownEmail: string; unknownUser: string; unknownDob: string; unknownBio: string; unknownDateTime: string; unknownExperience: string; unknownExpertise: string; noPhoto: string };
            nl: { unknownEmail: string; unknownUser: string; unknownDob: string; unknownBio: string; unknownDateTime: string; unknownExperience: string; unknownExpertise: string; noPhoto: string };
        } = {
            en: {
                unknownEmail: "Unknown",
                unknownUser: "Unknown user",
                unknownDob: "Not available",
                unknownBio: "No biography available",
                unknownDateTime: "Unknown date and time",
                unknownExperience: "No experience known",
                unknownExpertise: "No expertise",
                noPhoto: "No photo",
            },
            nl: {
                unknownEmail: "Onbekend",
                unknownUser: "Onbekende gebruiker",
                unknownDob: "Niet beschikbaar",
                unknownBio: "Geen biografie beschikbaar",
                unknownDateTime: "Onbekende datum en tijd",
                unknownExperience: "Geen ervaring bekend",
                unknownExpertise: "Geen expertise",
                noPhoto: "Geen foto",
            },
        };
        return messages[language as "en" | "nl"];
    }
}
