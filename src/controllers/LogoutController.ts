export class LogoutClass {
    public logoutFunction(): void {
        try {
            if (sessionStorage.getItem("session")) {
                if (confirm("Proceed with logout?")) {
                    sessionStorage.removeItem("session");
                    window.location.href = "http://localhost:3000/landingspagina.html";
                }
            }
            else {
                console.error("Fout met uitloggen");
            }
        }
        catch (reason) {
            console.error("Er is een fout opgetreden met het zoeken van de sessie", reason);
        }
    }
}
