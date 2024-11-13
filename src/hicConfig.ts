import { api } from "@hboictcloud/api";

try {
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
