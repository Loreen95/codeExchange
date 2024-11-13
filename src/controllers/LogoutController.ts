import { session } from "@hboictcloud/api";
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class LogoutClass {
    public async logoutFunction(): Promise<void> {
        try {
            if (await session.get("session")) {
                session.remove("session");
                UI.adjustPageToLoginStatus(false);
                window.location.href = "http://localhost:3000/landingspagina.html";
            }
            else {
                console.error("Fout met uitloggen");
            }
        }
        catch (reason) {
            console.error("Er is een fout opgetreden met het zoeken van de sessie", reason);
        }
    }
}
