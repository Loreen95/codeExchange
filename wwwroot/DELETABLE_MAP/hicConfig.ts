import { api } from "@hboictcloud/api";

try {
    // TODO: Pas de .env bestanden aan met de gegevens van HBO-ICT.Cloud
    api.configure({
        url: "https://api.hbo-ict.cloud",
        apiKey: VITE_HBOICTCLOUD_APIKEY,
        database: VITE_HBOICTCLOUD_DATABASE,
        environment: VITE_HBOICTCLOUD_ENVIRONMENT,
    });
}
catch (reason) {
    console.error(reason);
}
