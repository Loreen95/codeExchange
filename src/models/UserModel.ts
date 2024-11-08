// TODO: Zie ./docs/technical/classdiagram.md voor de invulling van dit bestand!

/**
 * Class User
 * Users hebben alleen een ID (voor de database), email en wachtwoord nodig
 */
export class UserModel {
    private id: number;
    private email: string;
    private password: string;

    // Hier is de constructor, hierbij word alle data geinitialiseerd
    public constructor(email: string, password: string, id: number = 0) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    // Email ophalen
    public getEmail(): string {
        return this.email;
    }

    // ID ophalen
    public getId(): number {
        return this.id;
    }

    // Wachtwoord ophalen
    public getPassword(): string {
        return this.password;
    }

    // Hier wordt een asynchrone functie aangeroepen die de gebruiker bij het ID opzoekt
    // Er wordt gebruik gemaakt van een promise - dit is een manier van error handeling
    public static async findById(id: number): Promise<UserModel | null> {
        return new Promise(resolve => {
            setTimeout(() => {
                if (id === 1) {
                    resolve(new UserModel("user@example.com", "password123", id));
                }
                else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    // Hier wordt een asynschrone functie aangeroepen die de gebruiker toevoegd
    // Er wordt gebruik gemaakt van een promise - dit is een manier van error handeling
    public static async addUser(email: string, password: string): Promise<UserModel | null> {
        return new Promise(resolve => {
            setTimeout(() => {
                if (email && password) {
                    resolve(new UserModel(email, password));
                }
                else {
                    resolve(null);
                }
            }, 1000);
        });
    }
}
