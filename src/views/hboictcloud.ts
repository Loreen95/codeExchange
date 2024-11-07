// Onderstaande bestanden moet je altijd importeren wanneer je pagina iets met de HBO-ICT.Cloud API doet!
import "../hicConfig";
import { api, localization, session, url } from "@hboictcloud/api";

// Activeer de voorbeelden
voorbeeldUrl();
voorbeeldSession();
voorbeeldQuery();
voorbeeldLocalization();

// Voorbeeld Url
function voorbeeldUrl(): void {
    const invoerElement: HTMLInputElement = document.querySelector("#input-url")!;
    const replaceKnopElement: HTMLButtonElement = document.querySelector("#button-url-replace")!;
    const redirectKnopElement: HTMLButtonElement = document.querySelector("#button-url-redirect")!;
    const resultaatElement: HTMLElement = document.querySelector("#url")!;

    // Haal de waarde in "test" uit de URL als string
    resultaatElement.innerHTML = url.getFromQueryString("test", "Leeg...") as string;

    replaceKnopElement.addEventListener("click", function () {
        // Pas de URL aan zonder te verversen
        url.replace("", {
            test: invoerElement.value,
        });
    });

    redirectKnopElement.addEventListener("click", function () {
        // Pas de URL aan en herlaad de huidige pagina met geschiedenis
        url.redirect("", {
            test: invoerElement.value,
        });
    });
}

// Voorbeeld Session
function voorbeeldSession(): void {
    const invoerElement: HTMLInputElement = document.querySelector("#input-session")!;
    const okKnopElement: HTMLButtonElement = document.querySelector("#button-session-ok")!;
    const resetKnopElement: HTMLButtonElement = document.querySelector("#button-session-reset")!;
    const resultaatElement: HTMLElement = document.querySelector("#session")!;

    // Haal de waarde in "test" uit de sessie als string
    resultaatElement.innerHTML = session.get("test", "Leeg...") as string;

    okKnopElement.addEventListener("click", function () {
        session.set("test", invoerElement.value);

        // Herlaad de huidige pagina met geschiedenis
        url.redirect("");
    });

    resetKnopElement.addEventListener("click", function () {
        session.remove("test");

        // Herlaad de huidige pagina met geschiedenis
        url.redirect("");
    });
}

// Voorbeeld Query
function voorbeeldQuery(): void {
    const invoerElement: HTMLInputElement = document.querySelector("#input-query")!;
    const knopElement: HTMLButtonElement = document.querySelector("#button-query")!;
    const resultaatElement: HTMLElement = document.querySelector("#query")!;

    knopElement.addEventListener("click", async function () {
        try {
            // Voer de ingevoerde query uit op de database
            const result: unknown[] = await api.queryDatabase(invoerElement.value) as unknown[];

            resultaatElement.innerHTML = JSON.stringify(result);
        }
        catch (error: unknown) {
            resultaatElement.innerHTML = error as string;
        }
    });
}

// Voorbeeld Localization
function voorbeeldLocalization(): void {
    const engelsKnopElement: HTMLButtonElement = document.querySelector("#button-localization-english")!;
    const nederlandsKnopElement: HTMLButtonElement = document.querySelector("#button-localization-dutch")!;
    const onbekendKnopElement: HTMLButtonElement = document.querySelector("#button-localization-xx")!;

    // Stel de beschikbare vertalingen in
    localization.setTranslations({
        paragraph: {
            en: "This text will be translated!",
            nl: "Deze tekst zal vertaald worden!",
        },
        english: {
            en: "English",
            nl: "Engels",
        },
        dutch: {
            en: "Dutch",
            nl: "Nederlands",
        },
    });

    // Gebruik Nederlands als standaard taal
    localization.switchLanguage("nl");

    engelsKnopElement.addEventListener("click", function () {
        localization.switchLanguage("en");
    });

    nederlandsKnopElement.addEventListener("click", function () {
        localization.switchLanguage("nl");
    });

    onbekendKnopElement.addEventListener("click", function () {
        localization.switchLanguage("xx");
    });
}
