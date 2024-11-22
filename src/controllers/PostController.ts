import { Post } from "../models/Post";
const postModel: Post = new Post(0, 0, "", "", 0, "");
import { Comment } from "../models/Comment";
const commentModel: Comment = new Comment(0, 0, 0, "", "", 0, "");
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "");
import UserInterfaceClass from "../views/interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

export class PostClass {
    // private _errorMessage: string = "";
    public async renderPosts(): Promise<void> {
        const postList: Post[] | undefined = await postModel.getAllPosts();
        const totalQquestionAmount: Element | null = document.querySelector("#totalQquestionAmount");

        if (totalQquestionAmount) {
            totalQquestionAmount.innerHTML = `(${postList?.length})`;
        }

        if (postList) {
            const insertPostsHere: HTMLDivElement | null = document.querySelector(".posts");
            if (!insertPostsHere) {
                console.error("Element .posts not found");
                return;
            }

            insertPostsHere.innerHTML = ""; // Maak de lijst leeg voordat we nieuwe posts renderen

            let postIndex: number = 0;

            // Render alle posts
            for (const post of postList) {
                let titleOfPost: string = "";
                let contentOfPost: string = "";
                const userName: string | undefined = (await userModel.getUserById(Number(post.getAuthorId())))?.getUserName();
                const stringedTimeAndDate: string = String(post.getDate()).slice(0, 10) + " | " + String(post.getDate()).slice(11, 19);

                titleOfPost = post.getTitle().length > 60 ? post.getTitle().slice(0, 60).concat("...") : post.getTitle();
                contentOfPost = post.getContent().length > 240 ? post.getContent().slice(0, 240).concat("...") : post.getContent();

                const comments: Comment[] = await commentModel.getCommentsByMessageId(post.getPostId());
                const totalComments: number = comments.length;

                insertPostsHere.insertAdjacentHTML("beforeend", `
                    <div class="question">
                        <p id="usersname">${userName} asks:</p>
                        <a id="postNr${postIndex}">
                            <div class="questionContent">
                                <h1>${titleOfPost}</h1>
                                <p>${contentOfPost}</p>
                                <div class="bottrow">
                                    <div class="iconrow">
                                        <p class="messageIcon"><i class="fa-solid fa-thumbs-up"></i> ${post.getRating()}</p>
                                        <p class="messageIcon"><i class="fa-sharp fa-solid fa-message"></i> ${totalComments}</p>
                                    </div>
                                    <p id="datetime">${stringedTimeAndDate}</p>
                                </div>                                
                            </div>
                        </a>                        
                    </div>
                `);

                const postElement: Element | null = insertPostsHere.querySelector(`#postNr${postIndex}`);
                if (postElement) {
                    postElement.addEventListener("click", () => {
                        sessionStorage.setItem("post_Nr", String(post.getPostId()));
                        window.location.href = "http://localhost:3000/post.html";
                    });
                }
                else {
                    console.error(`Element #postNr${postIndex} not found`);
                }

                postIndex++;
            }
        }
        else {
            console.log("Something is wrong, postList is undefined");
        }
    }

    public async isLoggedInUserResponsibleForThisPost(usersId: number, viewingPostId: number): Promise<boolean> {
        const currentpost: Post | undefined = await postModel.getPostById(viewingPostId);
        console.log(currentpost!.getAuthorId());
        if (usersId === currentpost!.getAuthorId()) {
            return true;
        }
        else {
            return false;
        }
    }

    public async onClickCreate(title: string, content: string): Promise<void> {
        try {
            const errorMessage: HTMLParagraphElement | null = document.querySelector("#errMsg");
            const successMessage: HTMLParagraphElement | null = document.querySelector("#successMsg");

            if (!errorMessage || !successMessage) {
                console.error("Error and success message elements not found.");
                return;
            }

            // Clear any existing messages
            errorMessage.innerHTML = "";
            successMessage.innerHTML = "";

            // Validate title and content
            if (!title || !content) {
                errorMessage.innerHTML += "You must add a title and message!";
                UI.unleashTheErrorPopup(true); // Assuming UI.unleashTheErrorPopup handles visibility
                return; // Stop execution if validation fails
            }

            // Validate session
            const userId: string | null = sessionStorage.getItem("session");
            if (!userId) {
                errorMessage.innerHTML += "You must be logged in!";
                UI.unleashTheErrorPopup(true);
                return; // Stop execution if user is not logged in
            }

            // Fetch user
            const user: User | undefined = await userModel.getUserById(Number(userId));
            if (!user) {
                errorMessage.innerHTML += "User not found!";
                UI.unleashTheErrorPopup(true);
                return; // Stop execution if user is not found
            }

            // Log user details (for debugging)
            console.log(`Author ID: ${userId}`);
            console.log(`Author Name: ${user.getUserName()}`);

            // Get the current date and format it
            const date: Date = new Date();
            const formattedDate: string = date.toISOString().slice(0, 19).replace("T", " ");

            // Create the post
            const isPostCreated: boolean = await postModel.create(Number(userId), title, content, formattedDate);

            if (isPostCreated) {
                // Post creation was successful
                successMessage.innerHTML = "Post created successfully!";
                UI.unleashTheErrorPopup(false); // Hide error popup if successful
                await this.renderPosts(); // Render posts after creation
            }
            else {
                // Post creation failed
                errorMessage.innerHTML += "Failed to create the post!";
                UI.unleashTheErrorPopup(true);
            }
        }
        catch (reason) {
            console.error("Error creating post!", reason);

            // Show error message in case of an exception
            const errorMessage: HTMLParagraphElement | null = document.querySelector("#errMsg");
            if (errorMessage) {
                errorMessage.innerHTML = "An error occurred while creating the post.";
                UI.unleashTheErrorPopup(true);
            }
        }
    }
}
// async function logPosts(): Promise <void> {
//     const postmodel: Post = new Post(0, 0, "", "", 0, "");
//     const listOfPosts: Post[] | undefined = await postmodel.getAllPosts();

//     // Controleer of de data is opgehaald
//     if (listOfPosts) {
//         listOfPosts.forEach(post => {
//             console.log(`Post ID: ${post.getPostId()}, Author ID: ${post.getAuthorId()}, Title: ${post.getTitle()}, Content: ${post.getContent()}`);
//         });
//     }
//     else {
//         console.log("Geen posts gevonden");
//     }
// }
