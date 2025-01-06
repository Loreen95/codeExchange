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
                en: "Edit profile",
                nl: "Profiel aanpassen",
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
                en: "Translate (NL)",
                nl: "Vertaalen (EN)",
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
            enough: {
                en: "Had enough?",
                nl: "Genoeg gehad?",
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
                en: "© 2024 - Burnout Alliance",
                nl: "© 2024 - Burnout Alliance",
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
            commentmessage: {
                en: "Create answer",
                nl: "Schrijf een reactie",
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
            slogan: {
                en: "Become a part of the exchange™",
                nl: "Become a part of the exchange™",
            },
            visit: {
                en: "See most recent posts ->",
                nl: "Zie resente vragen ->",
            },
            members: {
                en: "Devellopers signed up",
                nl: "Aangemelde ontwikkelaars",
            },
            questions: {
                en: "Questions asked ",
                nl: "Gestelde vragen",
            },
            answers: {
                en: "Answers given",
                nl: "Gegeven andwoorden",
            },
            browse: {
                en: "Browse recent questions >",
                nl: "recente vragen bekijken >",
            },
            recent: {
                en: "Most recent posts:",
                nl: "Meest recente vragen:",
            },
            join: {
                en: "Join the community",
                nl: "Word lid",
            },
            littleAbout: {
                en: "Statistics",
                nl: "Statistieken",
            },
            trustedBy: {
                en: "Trusted by like some people | This isn't a scam we promise",
                nl: "Vertrouwd door sommige mensen | we beloven dat dit geen scam is",
            },
            insultToInteligence: {
                en: "You uneducated fuk",
                nl: "Jij domme ank",
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
                en: "Ask a question",
                nl: "Stel een vraag",
            },
            not_found: {
                en: "Didn't find what you were looking for?",
                nl: "Niet gevonden wat je zocht?",
            },
            text1: {
                en: "You have just arrived in the home of many many developers And like why are you still reading this, you weren't supposed to do that. Now you know this text only exists for deccoration and the illusion is ruined. Just leave",
                nl: "Je bent zojuist aangekomen in het 'thuis' van vele ontwikkelaars. En waarom lees je dit nog? Dit moest je helemaal niet doen. En nu weet je dat deze tekst enkel decoratief is en is de illusie geruineerd. Ga weg",
            },
            text2: {
                en: "Join thousands of other developers on our wonderfull platform or something. So um. your screen is pretty thin huh?",
                nl: "Kom bij de duizenden andere ontwikkelaars op ons geweldige platform. En eh, je scherm is best dun huh",
            },
            memberSince: {
                en: "Member since:",
                nl: "Lid sinds:",
            },
            dob: {
                en: "Date of birth",
                nl: "Geboortedatum",
            },
            edit: {
                en: "Edit",
                nl: "Wijzigen",
            },
            createcomment: {
                en: "Submit Answer",
                nl: "Stuur antwoord",
            },
            totalpost: {
                en: "Total questions:",
                nl: "Totaal aantal vragen:",
            },
            totalanswer: {
                en: "Total answers:",
                nl: "Totaal aantal antwoorden:",
            },
            biography: {
                en: "Biography",
                nl: "Biografie",
            },
            totalrating: {
                en: "Total rating",
                nl: "Totaal aantal stemmen",
            },
            cancel: {
                en: "Cancel",
                nl: "Annuleren",
            },
            terms: {
                en: "By clicking “Submit Answer”, you agree to our terms of service and privacy policy.",
                nl: "Wanneer je 'Stuur Antwoord' aanklikt, ga je akkoord met onze voorwaarden en privacy policy.",
            },
            copyright2: {
                en: "© Copyright Code Exchange™ | 2024-3024, All rights reserved.",
                nl: "© Copyright Code Exchange™ | 2024-3024, Alle rechten voorbehouden.",
            },
            deleteaccount: {
                en: "Delete account",
                nl: "Account verwijderen",
            },
            deleteAccountPopup: {
                en: "Delete Code Exhange account?",
                nl: "Code Exhange account verwijderen?",
            },
            confirm: {
                en: "Confirm",
                nl: "Bevestigen",
            },
            yaSureBukko: {
                en: "Input password to proceed",
                nl: "Voer wachtwoord in om door te gaan",
            },
            answeredQuestions: {
                en: "Questions with answers",
                nl: "Vragen met antwoorden",
            },
            highestRated: {
                en: "Highest rated",
                nl: "Hoogste beoordeling",
            },
            applychanges: {
                en: "Apply changes",
                nl: "Aanpassingen toewijzen",
            },
            birthdate: {
                en: "Birthdate",
                nl: "Geboortedatum",
            },
            yearsexperience: {
                en: "Years of experience:",
                nl: "Jaren ervaring:",
            },
            expertise: {
                en: "Expertise:",
                nl: "Expertise:",
            },
            deleteComment: {
                en: "Delete this comment?",
                nl: "Andwoord verwijderen?",
            },
            edit_own_question: {
                en: "Edit your question",
                nl: "Pas jouw vraag aan",
            },
            editPost: {
                en: "Edit post",
                nl: "Post aanpassen",
            },
        });
    }

    public translatePage(): void {
        localization.translate(true);
    }
}
