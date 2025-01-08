import { localization } from "@hboictcloud/api";
import translations from "../../wwwroot/assets/lang/translations.json";

export class LanguageClass {
    public constructor() {
        // Stel de vertalingen slechts één keer in
        this.setTranslation();
    }

    /**
     * Dit laadt de opgeslagen taal uit sessionStorage
     * @returns De taal die opgeslagen is in sessionStorage
     */
    public getLanguage(): string {
        const getLang: string | null = sessionStorage.getItem("lang") || "en";
        return getLang;
    }

    /**
     * Dit stelt de taal van de website in
     * @param lang De gewenste taal
     */
    public setLanguage(lang: string): void {
        sessionStorage.setItem("lang", lang);
        localization.switchLanguage(lang);
        this.translatePage();
    }

    private setTranslation(): void {
        localization.setTranslations(translations);
        console.log(translations);
    }

    public translatePage(): void {
        localization.translate(true);
    }
}
