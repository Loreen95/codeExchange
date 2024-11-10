import { UserModel } from "../models/UserModel";
import { UserView } from "../views/UserView";
import "../database/database";
import { api } from "@hboictcloud/api";
import { NonQueryResult, ApiFailReason, User } from "../../wwwroot/DELETABLE_MAP/interfaces";

export class UserController {
    private userView: UserView;
    private userModel: UserModel[];

    public constructor() {
        this.userView = new UserView();
        this.userModel = [];
    }

    // Methode om gebruikers op te halen en weer te geven
    public async getAllUsers(): Promise<void> {
        try {
            // Verkrijg data van de database
            const data: NonQueryResult | ApiFailReason | User[] | string = await api.queryDatabase<User>("SELECT * FROM users");

            // Controleer eerst of het een foutmelding is (string)
            if (typeof data === "string") {
                console.log("API failure reason:", data);
            }
            // Als de data een array is van User-objecten
            else if (Array.isArray(data)) {
                this.userModel = data.map(user => new UserModel(user.email, "", user.id));
                this.userView.render(data);// Render gebruikers
                console.log(this.userModel);
            }
            // Als de data een NonQueryResult is
            else if ("affectedRows" in data) {
                console.log("Non-query result: aantal aangetaste rijen:", data.affectedRows);
            }
            // Als de data een ApiFailReason is
            else if ("reason" in data) {
                console.log("API failure reason:", (data as ApiFailReason).reason); // Cast naar ApiFailReason
            }
        }
        catch (reason) {
            console.log("Error fetching users:", reason);
        }
    }
}
