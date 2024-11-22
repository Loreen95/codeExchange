export class HomeView {
    public view: HTMLElement;

    // Constructor om een HTML element door te geven
    public constructor(view: HTMLElement) {
        this.view = view;
    }

    // Methode om de homepagina weer te geven
    public render(): void {
        // Je kunt hier bijvoorbeeld dynamisch content toevoegen aan de view
        this.view.innerHTML = "<h1>Welcome to the Home Page</h1>";
    }
}
