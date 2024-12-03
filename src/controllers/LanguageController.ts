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
                nl: "Vragen",
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
                en: "Email",
                nl: "E-mailadres",
            },
            emailuser: {
                en: "Email or Username",
                nl: "E-mail of gebruikersnaam",
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
            company: {
                en: "Company",
                nl: "Bedrijf",
            },
            careers: {
                en: "Careers",
                nl: "Vacatures",
            },
            contact: {
                en: "Contact",
                nl: "Contact",
            },
            press: {
                en: "Press",
                nl: "Pers",
            },
            support: {
                en: "Costumer service",
                nl: "Klantenservice",
            },
            products: {
                en: "Products",
                nl: "Producten",
            },
            about: {
                en: "About",
                nl: "Over",
            },
            faq: {
                en: "Frequently asked questions",
                nl: "Veel gestelde vragen",
            },
            copyright: {
                en: "© 2027 - Burnout Alliance",
                nl: "© 2027 - Burnout Alliance",
            },
            copyrighttext: {
                en: "All rights reserved",
                nl: "Alle rechten voorbehouden",
            },
            postmessage: {
                en: "Create post",
                nl: "Bericht maken",
            },
            title: {
                en: "Title",
                nl: "Titel",
            },
            createpost: {
                en: "Create post",
                nl: "Bericht aamaken",
            },
            content: {
                en: "Content",
                nl: "Bericht",
            },
            wakingWorld: {
                en: "Wake up",
                nl: "Word wakker",
            },
            asks: {
                en: "asks",
                nl: "vraagt",
            },
            welcome: {
                en: "Welcome",
                nl: "Welkom",
            },
            members: {
                en: "Members",
                nl: "Leden",
            },
            questions: {
                en: "Questions",
                nl: "Vragen",
            },
            answers: {
                en: "Answers",
                nl: "Antwoorden",
            },
            recent: {
                en: "Most recent posts",
                nl: "Meest recente berichten",
            },
            join: {
                en: "Join the community",
                nl: "Word lid van de community",
            },
            translate_service: {
                en: "Translate services",
                nl: "Vertaal service",
            },
            education: {
                en: "Education",
                nl: "Lessen",
            },
            all_questions: {
                en: "All Questions",
                nl: "Alle Vragen",
            },
            create_answer: {
                en: "Add answer",
                nl: "Antwoord toevoegen",
            },
            own_question: {
                en: "Ask your own question",
                nl: "Stel een eigen vraag",
            },
            not_found: {
                en: "Didn't find what you were looking for?",
                nl: "Niet gevonden wat je zocht?",
            },
        });
    }

    public translatePage(): void {
        localization.translate(true);
    }
}
