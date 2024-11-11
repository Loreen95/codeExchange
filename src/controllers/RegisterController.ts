class RegistrationClass {
    // public echo(lineup: string[]): void {
    //     const severoaubarka: HTMLParagraphElement = document.querySelector("#severo")!;
    //     for (let j: number = 0; j < lineup.length; j++) {
    //         severoaubarka.innerHTML += `
    //         <p>${lineup[j]}</p>
    //         `;
    //         console.log(lineup[j]);
    //     }
    // }
    private reasonOfWeakness: string = "";
    public passChecker(givenPassword: string): boolean {
        console.log("trigger1");
        if (givenPassword.length < 7) {
            this.reasonOfWeakness = "your password is too short. Use at least 7 caracers";
            return false;
        }
        else if (givenPassword.length > 20) {
            this.reasonOfWeakness = "Your password is too long. Use 20 caracters at max";
            return false;
        }
        else {
            const streangth: boolean = Boolean(givenPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$/));

            if (streangth) {
                return true;
            }
            else {
                this.reasonOfWeakness = "Your password isn't strong enough. Use lowercase, uppercase, numbers and special caracters";
                return false;
            }
        }
    }

    public verifyCridentials(userInputName: string, userInputEmail: string, userInputPassword: string): void {
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        if (!userInputName) {
            errorMessage.innerText = "You must provide a name";
        }
        else if (!userInputEmail) {
            errorMessage.innerText = "You'll have to give me an email if you want in";
        }
        else if (!userInputPassword) {
            errorMessage.innerText = "Be sure to provide a password";
        }
        else if (!this.passChecker(userInputPassword)) {
            errorMessage.innerText = String(this.reasonOfWeakness);
        }
        else if (!userInputEmail.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            errorMessage.innerText = "The provided email is invalid";
        }
        else {
            errorMessage.innerHTML = "momentairy sucsess";
        }
    }
}

export default RegistrationClass;
