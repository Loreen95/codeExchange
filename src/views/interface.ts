class UserInterfaceClass {
    // public item1: string = "Juleus";
    // public item2: number = 8;
    // public item3: boolean = false;
    // public anguish(belp: string): string {
    //     return `${this.item1} has ${this.item3}ley bested ${this.item2} of them ${belp}`;
    // }

    // public echo(lineup: string[]): void {
    //     const severoaubarka: HTMLParagraphElement = document.querySelector("#severo")!;
    //     for (let j: number = 0; j < lineup.length; j++) {
    //         severoaubarka.innerHTML += `
    //         <p>${lineup[j]}</p>
    //         `;
    //         console.log(lineup[j]);
    //     }
    // }
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
