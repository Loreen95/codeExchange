import { UserModel } from "../models/UserModel";
import { UserView } from "../views/UserView";

export class UserController {
    private userView: UserView;
    private users: UserModel[];

    public constructor() {
        this.userView = new UserView();
        this.users = [];
    }

    // Deze functies doen alsof de gebruiker in de database opgeslagen wordt
    public async addUser(email: string, password: string): Promise<void> {
        try {
            if (email && password) {
                const newUser: UserModel | null = await this.saveUserToDatabase(email, password);
                this.users.push(newUser);
                // console.log("Gebruiker toegevoegd:", newUser);
            }
            else {
                console.log("Kan de gegevens niet toevoegen, ontbreekt email of wachtwoord");
            }
        }
        catch (error) {
            console.error("Er is een fout opgetreden bij het aanmaken van de gebruiker", error);
        }
    }

    // Deze functies doen alsof de gebruiker in de database opgeslagen wordt
    private saveUserToDatabase(email: string, password: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const newUser: UserModel | null = new UserModel(email, password, this.users.length + 1);
                    resolve(newUser);
                }
                else {
                    reject(new Error("Email of wachtwoord ontbreekt"));
                }
            }, 1000);
        });
    }

    // Deze asynchrone functie gaat eerst zorgen dat iemand volgens zijn ID in de database gevonden wordt.
    // Daarna voert hij de rest van deze functie uit
    public async getUserDetails(id: number): Promise<void> {
        try {
            const user: UserModel | null = await UserModel.findById(id);
            if (user) {
                this.userView.render(user);
            }
            else {
                console.log("Gebruiker niet gevonden");
            }
        }
        catch (error) {
            console.error("Er is een fout opgetreden bij het ophalen van de gebruiker:", error);
        }
    }
}
