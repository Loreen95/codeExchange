import { UserModel } from "../models/UserModel";
import { UserView } from "../views/UserView";
import { api } from "@hboictcloud/api";
import "../database/database";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface NonQueryResult {
    affectedRows: number;
}

export class UserController {
    private userView: UserView;
    private users: UserModel[];

    public constructor() {
        this.userView = new UserView();
        this.users = [];
    }
}
try {
    const data: string | any[] | NonQueryResult = await api.queryDatabase("SELECT * from users");
    console.log(data);
}
catch (reason) {
    console.log(reason);
}
