// Welcome to the mucles behind the face of this website!
// This controller exists to perform the user interface features
class UserInterfaceClass {
    /* This function swaps out certain elements based on the loginstatus of the user
    *  It receives an affermative or negative as argument
    *  And returns nothing.
    */
    public adjustPageToLoginStatus(isLoggedIn: boolean): void {
        // Collect all needed assets
        const logedinExclusives: NodeListOf<HTMLElement> = document.querySelectorAll(".loggedInMedia");
        const logedOutExclusives: NodeListOf<HTMLElement> = document.querySelectorAll(".loggedOutMedia");

        // Loop through all affected assets and disables unwanted ones
        if (isLoggedIn) {
            for (let l: number = 0; l < logedOutExclusives.length; l++) {
                logedOutExclusives[l].style.display = "none";
            }
        }
        else {
            for (let l: number = 0; l < logedinExclusives.length; l++) {
                logedinExclusives[l].style.display = "none";
            }
        }
    }

    public adjustPageToOwnerStatus(isOwnerOfContent: boolean): void {
        const ownerExclusive: NodeListOf<HTMLElement> = document.querySelectorAll("#isTheOwner");
        const nonOwnerExclusive: NodeListOf<HTMLElement> = document.querySelectorAll("#notTheOwner");

        if (isOwnerOfContent) {
            for (let l: number = 0; l < ownerExclusive.length; l++) {
                ownerExclusive[l].style.display = "flex";
            }
        }
        else {
            for (let l: number = 0; l < nonOwnerExclusive.length; l++) {
                nonOwnerExclusive[l].style.display = "flex";
            }
        }
    }

    public unleashTheErrorPopup(shouldIActivate: boolean): void {
        // This gatheres the needed Html elements to display warnings and information about the provided credentials
        const errorPopupContainer: HTMLDivElement = document.querySelector(".errorPopup")!;
        if (shouldIActivate) {
            errorPopupContainer.style.right = "0";
            errorPopupContainer.style.backgroundColor = "#391a19";
        }
        else {
            errorPopupContainer.style.right = "-570PX";
        }
    }

    public successMessagePopup(activate: boolean): void {
        const successPopupContainer: HTMLDivElement = document.querySelector(".successPopup")!;
        if (activate) {
            successPopupContainer.style.right = "0";
            successPopupContainer.style.backgroundColor = "#19391b";
        }
        else {
            successPopupContainer.style.right = "-570PX";
        }
    }

    /**
     * name
     */

    private _confirmPopupIsVisible: boolean = false;
    public revealOrHideConfirmPopup(): void {
        const confirmPopupBackground: HTMLDivElement = document.querySelector(".confirmPopup")!;
        if (this._confirmPopupIsVisible) {
            confirmPopupBackground.style.display = "none";
            this._confirmPopupIsVisible = false;
        }
        else {
            confirmPopupBackground.style.display = "flex";
            this._confirmPopupIsVisible = true;
        }
    }

    public dressConfirmPopupToDeleteComment(): void {
        const stuff: HTMLDivElement = document.querySelector(".confirmPopupContent")!;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (stuff) {
            stuff.innerHTML = `
                <div class="confirmPopupText">
                    <p class="confirmPopupMessage" data-translate="deleteComment">Delete comment?</p>
                <div>
                <div class="confirmPopupButtons">
                    <button class="defaultRedButton" id="kjillComment" data-translate="confirm">Confirm</button> 
                    <button class="closeConfirmPopup2" data-translate="cancel">Cancel</button>
                </div>
            `;
        }
    }

    // this method opens the foldnav. And it can close it too
    private _opened: boolean = false;
    public shutterSlide(): void {
        const slideoutMenu: HTMLDivElement = document.querySelector(".foldopenMenu")!;
        if (this._opened) {
            slideoutMenu.style.right = "-570px";
            this._opened = false;
        }
        else {
            slideoutMenu.style.right = "0";
            this._opened = true;
        }
    }

    // And this affects the eye uf the unseeing one. Hiding and revealing secrets only the user may know.
    private _hidden: boolean = true;
    public revealAndHidePass(): void {
        const passinput: HTMLInputElement = document.querySelector("#password")!;
        const eyeSlumbering: HTMLLinkElement = document.querySelector(".hideBttn")!;
        const eyeAwakened: HTMLLinkElement = document.querySelector(".unHideBttn")!;
        if (this._hidden) {
            passinput.type = "text";
            eyeAwakened.style.display = "none";
            eyeSlumbering.style.display = "block";
            this._hidden = false;
        }
        else {
            passinput.type = "password";
            eyeAwakened.style.display = "block";
            eyeSlumbering.style.display = "none";
            this._hidden = true;
        }
    }
}

export default UserInterfaceClass;
