// No clue why this exists. This could easily be argued as part of the login controller, but the diagram is king
export class LogoutClass {
    public logoutFunction(): void {
        // Well this here, uh.. yeah, this just loggs you out. Idunno what to say.
        try {
            if (sessionStorage.getItem("session")) {
                sessionStorage.removeItem("session");
                window.location.href = "http://localhost:3000/landingspagina.html";
            }
            // This shouldn't be possible because the session needs to exist before you have access to the logout button
            else {
                console.error("Error logging out");
            }
        }
        catch (reason) {
            console.error("Error fetching session", reason);
        }
    }
}
