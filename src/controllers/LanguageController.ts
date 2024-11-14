import { localization } from "@hboictcloud/api";

export class LanguageClass {
    public constructor() {
        // Stel de vertalingen slechts één keer in
        this.setTranslation();
    }

    public getLanguage(): string {
        const getLang: string | null = sessionStorage.getItem("lang") || "en";
        return getLang;
    }

    public setLanguage(lang: string): void {
        sessionStorage.setItem("lang", lang);
        localization.switchLanguage(lang);
        // Pas de vertalingen toe op de pagina
        this.translatePage();
    }

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
