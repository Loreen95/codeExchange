class UserInterfaceClass {
    // public item1: string = "Juleus";
    // public item2: number = 8;
    // public item3: boolean = false;
    // public anguish(belp: string): string {
    //     return `${this.item1} has ${this.item3}ley bested ${this.item2} of them ${belp}`;
    // }

    public ajustPageToLoginStatus(isLoggedIn: boolean): void {
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
    private opened: boolean = false;
    public shutterSlide(): void {
        const slideoutMenu: HTMLDivElement = document.querySelector(".foldopenMenu")!;
        if (this.opened) {
            slideoutMenu.style.right = "-320px";
            this.opened = false;
        }
        else {
            slideoutMenu.style.right = "0";
            this.opened = true;
        }
    }
}

export default UserInterfaceClass;

// severoaubarka.innerHTML = "ello3";
