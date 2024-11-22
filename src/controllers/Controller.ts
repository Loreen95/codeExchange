export abstract class Controller {
    protected _view: HTMLElement;

    protected constructor(view: HTMLElement) {
        this._view = view;
    }

    // Deze render methode kan in afgeleide klassen worden aangepast
    protected render(): void | Promise<void> {
        // Basis render logica, bijvoorbeeld gewoon de view tonen.
        console.log("Rendering view: ", this._view);
    }
}
