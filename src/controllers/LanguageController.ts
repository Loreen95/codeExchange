import { localization } from "@hboictcloud/api";

export class LanguageClass {
    public constructor() {
        // Stel de vertalingen slechts één keer in
        this.setTranslation();
    }

    /**
     * This function fetches the stored language from sessionStorage
     * @returns Returns the language which is being stored in sessionStorage
     */
    public getLanguage(): string {
        const getLang: string | null = sessionStorage.getItem("lang") || "en";
        return getLang;
    }

    /**
     * This function sets the website to the desired language
     * @param lang Uses the lang-parameter to set the desired language
     */
    public setLanguage(lang: string): void {
        sessionStorage.setItem("lang", lang);
        localization.switchLanguage(lang);
        this.translatePage();
    }

    /**
     * This function sets the proper translation on the website (list)
     */
    private setTranslation(): void {
        localization.setTranslations({
            profile: {
                en: "Profile",
                nl: "Profiel",
            },
            register: {
                en: "Register",
                nl: "Registreren",
            },
            login: {
                en: "Login",
                nl: "Inloggen",
            },
            posts: {
                en: "Posts",
                nl: "Berichten",
            },
            newpost: {
                en: "New post",
                nl: "Nieuw bericht",
            },
            users: {
                en: "Users",
                nl: "Gebruikers",
            },
            language: {
                en: "Dutch",
                nl: "Engels",
            },
            logout: {
                en: "Logout",
                nl: "Uitloggen",
            },
            registermessage: {
                en: "Create account",
                nl: "Account maken",
            },
            username: {
                en: "Username",
                nl: "Gebruikersnaam",
            },
            password: {
                en: "Password",
                nl: "Wachtwoord",
            },
            email: {
                en: "Email addres",
                nl: "E-mailadres",
            },
            createaccount: {
                en: "Create",
                nl: "Aanmaken",
            },
            loginmessage: {
                en: "Login",
                nl: "Inloggen",
            },
            notmember: {
                en: "Have you not registered yet?",
                nl: "Ben je nog geen lid?",
            },
            alreadymember: {
                en: "Already have an account?",
                nl: "Heb je al een account?",
            },
        });
    }

    public translatePage(): void {
        localization.translate(true);
    }
}
