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
}
