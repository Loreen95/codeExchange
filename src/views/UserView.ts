export class UserView {
    public view: HTMLElement;

    public constructor(view: HTMLElement) {
        this.view = view;
    }

    public render(): void {
        this.view.innerHTML = "<h1>Hi</h1>";
    }
}
