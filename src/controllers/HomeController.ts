import { session } from "@hboictcloud/api";
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class HomeClass {
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
            console.error("Fout met ophalen sessie", reason);
        }
    }
}
