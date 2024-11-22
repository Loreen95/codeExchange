import { Controller } from "./Controller";
import { HomeView } from "../views/HomeView";

export class HomeController extends Controller {
    private homeView: HomeView;

    // Constructor die een HomeView instantie accepteert
    public constructor(homeView: HomeView) {
        super(homeView.view); // Oproep naar de constructor van de abstracte Controller
        this.homeView = homeView;
    }

    // Specifieke render logica voor de homepagina
    public async renderHomePage(): Promise<void> {
        try {
            this.homeView.render(); // Weergeven van de view, wachten op asynchrone rendering
            await this.render(); // Standaard renderen van de controller, wacht op asynchrone rendering
            console.log("HomeController: Home page is rendered");
        }
        catch (error) {
            console.error("Error rendering home page:", error);
        }
    }
}

// import { session } from "@hboictcloud/api";
// import UserInterfaceClass from "../views/interface";
// const UI: UserInterfaceClass = new UserInterfaceClass();

// export class HomeClass {
//     /**
//      * This function searches for an existing session and adjust the UI accordingly.
//      */
//     public async getSession(): Promise<void> {
//         try {
//             if (!await session.get("session")) {
//                 UI.adjustPageToLoginStatus(false);
//             }
//             else {
//                 UI.adjustPageToLoginStatus(true);
//             }
//         }
//         catch (reason) {
//             console.error("Error fetching session", reason);
//         }
//     }
// }
