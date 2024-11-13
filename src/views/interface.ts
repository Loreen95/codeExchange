class UserInterfaceClass {
    public adjustPageToLoginStatus(isLoggedIn: boolean): void {
        const logedinExclusives: NodeListOf<HTMLElement> = document.querySelectorAll(".loggedInMedia");
        const logedOutExclusives: NodeListOf<HTMLElement> = document.querySelectorAll(".loggedOutMedia");
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

    // this here method opens a foldnav. And closes it too!
    private _opened: boolean = false;
    public shutterSlide(): void {
        const slideoutMenu: HTMLDivElement = document.querySelector(".foldopenMenu")!;
        if (this._opened) {
            slideoutMenu.style.right = "-320px";
            this._opened = false;
        }
        else {
            slideoutMenu.style.right = "0";
            this._opened = true;
        }
    }

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

// severoaubarka.innerHTML = "ello3";
