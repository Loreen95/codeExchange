/**
 * The HomeController-class will initialize the home/landingpage of Code Exchange
 */
export class HomeController {
    private _view: HTMLElement;
    /**
     * Creates an instance of Homecontroller
     * @param view This will be the element where the data gets displayed
     */
    public constructor(view: HTMLElement) {
        this._view = view;
    }
}
