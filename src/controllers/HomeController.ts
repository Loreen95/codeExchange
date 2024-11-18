import { session } from "@hboictcloud/api";
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class HomeClass {
    /**
     * This function searches for an existing session and adjust the UI accordingly.
     */
    public async getSession(): Promise<void> {
        try {
            if (!await session.get("session")) {
                UI.adjustPageToLoginStatus(false);
            }
            else {
                UI.adjustPageToLoginStatus(true);
            }
        }
        catch (reason) {
            console.error("Error fetching session", reason);
        }
    }
}
