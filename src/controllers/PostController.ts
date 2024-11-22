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

    public async getUserName(ID: number): Promise<string> {
        const userName: string | undefined = (await userModel.getUserById(Number(ID)))?.getUserName();
        return String(userName);
    }

    public async getCommentAmount(): Promise<number | undefined> {
        const totalComments: number = (await commentModel.getCommentsByMessageId(Number(sessionStorage.getItem("post_Nr")))).length;
        return totalComments;
    }

    public async renderPosts(): Promise<void> {
        const postList: Post[] | undefined = await postModel.getAllPosts();
        if (document.querySelector("#totalQquestionAmount")) {
            document.querySelector("#totalQquestionAmount")!.innerHTML = `(${postList?.length})`;
        }
        if (postList) {
            const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;
            let postIndex: number = 0;

            postList.forEach(async post => {
                let titleOfPost: string = "";
                let contentOfPost: string = "";
                const userName: string | undefined = (await userModel.getUserById(Number(post.getAuthorId())))?.getUserName();
                const stringedTimeAndDate: string = String(post.getDate()).slice(0, 10) + " | " + String(post.getDate()).slice(11, 19);
                let rating: number = 0;
                if (post.getRating()) {
                    rating = post.getRating();
                }

                // Verkort titel en content indien nodig
                titleOfPost = post.getTitle().length > 60 ? post.getTitle().slice(0, 60).concat("...") : post.getTitle();
                contentOfPost = post.getContent().length > 240 ? post.getContent().slice(0, 240).concat("...") : post.getContent();

                // Ophalen van het aantal comments voor deze post
                const comments: Comment[] = await commentModel.getCommentsByMessageId(post.getPostId());
                const totalComments: number = comments.length;

                // HTML-injectie
                insertPostsHere.insertAdjacentHTML("beforeend", `
                    <div class="question">
                        <p id="usersname">${userName} asks:</p>
                        <a id="postNr${postIndex}">
                            <div class="questionContent">
                                <h1>${titleOfPost}</h1>
                                <p>${contentOfPost}</p>
                                <div class="bottrow">
                                    <div class="iconrow">
                                        <p class="messageIcon"><i class="fa-solid fa-thumbs-up"></i> ${rating}</p>
                                        <p class="messageIcon"><i class="fa-sharp fa-solid fa-message"></i> ${totalComments}</p>
                                    </div>
                                    <p id="datetime">${stringedTimeAndDate}</p>
                                </div>                                
                            </div>
                        </a>                        
                    </div>
                `);

                // Klikfunctionaliteit toevoegen aan de post
                insertPostsHere.querySelector(`#postNr${postIndex}`)!.addEventListener("click", () => {
                    sessionStorage.setItem("post_Nr", String(post.getPostId()));
                    window.location.href = "http://localhost:3000/post.html";
                });

                postIndex++;
            });
        }
        else {
            console.log("something is wrong");
        }
    }

    public async renderComments(): Promise<void> {
        const insertCommenthere: HTMLDivElement = document.querySelector(".awnsers")!;
        const commentList: Comment[] | undefined = await commentModel.getCommentsByMessageId(Number(sessionStorage.getItem("post_Nr")));

        commentList.forEach(async _comment => {
            insertCommenthere.insertAdjacentHTML("beforeend", `
                    <h1 class="awnserTitle">${(await userModel.getUserById(Number(_comment.getUserId())))?.getUserName()}</h1>
                <div class="indivAwnser">
                    <div class="ratingPart">
                        <i class="fa-solid fa-thumbs-up"></i>
                        <p class="insertRatingHere">${_comment.getRating()}</p>
                        <i class="fa-solid fa-thumbs-down"></i>
                    </div>
                    <div class="contentPart contentPartComment">${_comment.getContent()}</div>
                </div>
                <p class="bottomDate">${String(_comment.getDate()).slice(0, 10) + " | " + String(_comment.getDate()).slice(11, 19)}</p>
                <hr>
            `);
        });
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
        const errorMessage: HTMLParagraphElement = document.querySelector("#errMsg")!;
        const successMessage: HTMLParagraphElement = document.querySelector("#successMsg")!;

        // Clear any existing messages
        errorMessage.innerHTML = "";
        successMessage.innerHTML = "";

        try {
            // Validate title and content
            if (!title || !content) {
                errorMessage.innerHTML = "You must add a title and message!";
                UI.unleashTheErrorPopup(true);
                return;
            }

            // Validate session
            const userId: string | null = sessionStorage.getItem("Session");
            if (!userId) {
                errorMessage.innerHTML = "You must be logged in!";
                UI.unleashTheErrorPopup(true);
                return;
            }

            // Fetch user
            const user: User | undefined = await userModel.getUserById(Number(userId));
            if (!user) {
                errorMessage.innerHTML = "User not found!";
                UI.unleashTheErrorPopup(true);
                return;
            }

            // Log user details
            console.log(`Author ID: ${userId}`);
            console.log(`Author Name: ${user.getUserName()}`);

            // Create the post
            const success: boolean = await postModel.create(Number(userId), title, content, new Date().toISOString());
            if (success) {
                successMessage.innerHTML = "Post created successfully!";
                UI.unleashTheErrorPopup(false);
            }
            else {
                errorMessage.innerHTML = "Failed to create the post!";
                UI.unleashTheErrorPopup(true);
            }
        }
        catch (reason) {
            console.error("Error creating post!", reason);
            errorMessage.innerHTML = "An unexpected error occurred.";
            UI.unleashTheErrorPopup(true);
        }
    }

    public encodeContentForVieuwingPurposes(content: string): string {
        let content2: string = content;
        content2 = content2.replaceAll("[code]", "<Pre>\n<code class=\"hljs language-bash\">");
        content2 = content2.replaceAll("[/code]", "</code>\n</Pre>");
        console.log(content2);
        return content2.replaceAll("\n", "<br>");
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
