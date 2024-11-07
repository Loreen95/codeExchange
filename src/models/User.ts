// TODO: Zie ./docs/technical/classdiagram.md voor de invulling van dit bestand!
export class User {
    private _id: number;
    private _email: string;
    private _password: string;

    public constructor(email: string, password: string, id: number = 0) {
        this._id = id;
        this._email = email;
        this._password = password;
    }
}
