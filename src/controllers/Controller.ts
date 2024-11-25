export abstract class Controller {
    protected _view: HTMLElement;

    protected constructor(view: HTMLElement) {
        this._view = view;
    }

    protected render(): void | Promise<void> {
        console.log("Rendering view:", this._view);
    }
}
