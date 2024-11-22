import { HomeView } from "../views/HomeView";
import { HomeController } from "../controllers/HomeController";

// Maak een HTML element aan voor de homepagina
const homeViewElement: HTMLDivElement = document.createElement("div");
homeViewElement.id = "Home View"; // Stel een ID in voor de view

// Maak een instantie van HomeView met dit element
const homeView: HomeView = new HomeView(homeViewElement);

// Maak een instantie van HomeController en geef de HomeView door
const homeController: HomeController = new HomeController(homeView);

// Roep de renderHomePage methode aan om de homepagina te renderen
homeController.renderHomePage().then(() => {
    console.log("Home page rendering complete.");
}).catch((error: unknown) => {
    console.error("An error occurred while rendering the home page:", error);
});

// Voeg de home view toe aan de DOM (bijvoorbeeld aan de body van de pagina)
document.body.appendChild(homeViewElement);
