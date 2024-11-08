class RegistrationClass {
    public cough(): void {
        console.log("*Cough cough");
    }

    // public echo(lineup: string[]): void {
    //     const severoaubarka: HTMLParagraphElement = document.querySelector("#severo")!;
    //     for (let j: number = 0; j < lineup.length; j++) {
    //         severoaubarka.innerHTML += `
    //         <p>${lineup[j]}</p>
    //         `;
    //         console.log(lineup[j]);
    //     }
    // }
    public emailVerify(userInputEmail: string): void {
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        console.log(`Email Verification Initialised...${userInputEmail}`);
        if (!userInputEmail) {
            errorMessage.innerText = "You'll have to give me an email if you want to join the comunnity";
        }
        // get proper regex
        else if (!userInputEmail.match(/^[A-Za-z]*$/)) {
            errorMessage.innerText = "The email provided here is unvalid";
        }
        else {
            errorMessage.innerHTML = "he";
        }
    }
}

export default RegistrationClass;
