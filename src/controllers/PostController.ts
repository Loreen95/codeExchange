import { Post } from "../models/Post";
const postModel: Post = new Post(0, 0, "", "", 0, "");
import { Comment } from "../models/Comment";
const commentModel: Comment = new Comment(0, 0, 0, "", "", 0, "");
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "");
import UserInterfaceClass from "../views/interface";
import hljs from "highlight.js";
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
        const totalQquestionAmount: Element | null = document.querySelector("#totalQquestionAmount");

        if (totalQquestionAmount) {
            totalQquestionAmount.innerHTML = `(${postList?.length})`;
        }

        if (postList) {
            const insertPostsHere: HTMLDivElement | null = document.querySelector(".posts");
            if (!insertPostsHere) {
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
                let rating: number = 0;
                if (post.getRating()) {
                    rating = post.getRating();
                }

                titleOfPost = post.getTitle().length > 60 ? post.getTitle().slice(0, 60).concat("...") : post.getTitle();
                if (post.getContent().includes("[code]")) {
                    const cutoffValue: number = post.getContent().indexOf("[code]");
                    contentOfPost = post.getContent().slice(0, cutoffValue);
                }
                else {
                    contentOfPost = post.getContent().length > 240 ? post.getContent().slice(0, 240).concat("...") : post.getContent();
                }

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
                                        <p class="messageIcon"><i class="fa-solid fa-thumbs-up"></i> ${rating}</p>
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

    public async renderComments(): Promise<void> {
        const insertCommenthere: HTMLDivElement = document.querySelector(".awnsers")!;
        const commentList: Comment[] | undefined = await commentModel.getCommentsByMessageId(Number(sessionStorage.getItem("post_Nr")));

        commentList.forEach(async _comment => {
            insertCommenthere.insertAdjacentHTML("beforeend", `
                    <h1 class="awnserTitle">${(await userModel.getUserById(Number(_comment.getUserId())))?.getUserName()}</h1>
                <div class="indivAwnser">
                    <div class="contentPart contentPartComment">${this.encodeContentForVieuwingPurposes(_comment.getContent())}</div>
                </div>
                <div class="dateAndRating">
                    <p class="bottomDate">${String(_comment.getDate()).slice(0, 10) + " | " + String(_comment.getDate()).slice(11, 19)}</p>
                    <div class="ratingPart">
                        <i class="fa-solid fa-thumbs-up"></i>
                        <p class="insertRatingHere">${_comment.getRating()}</p>
                        <i class="fa-solid fa-thumbs-down"></i>
                    </div>
                </div>                
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
                UI.unleashTheErrorPopup(false);
                UI.successMessagePopup(true);
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

    // public encodeContentForVieuwingPurposes(content: string): string {
    //     let content2: string = content;
    //     content2 = content2.replaceAll("[code]", "<Pre>\n<code>");
    //     content2 = content2.replaceAll("[/code]", "</code>\n</Pre>");
    //     console.log(content2);
    //     return content2.replaceAll("\n", "<br>");
    // }

    public encodeContentForVieuwingPurposes(content: string): string {
        if (content.includes("[code]")) {
            content = content.replaceAll(/\[code\]((?:.|\s)*?)\[\/code\]/g, codeBlock => {
                codeBlock = codeBlock.replaceAll("[code]", "");
                codeBlock = codeBlock.replaceAll("[/code]", "");
                return "<Pre>\n<code>" + hljs.highlightAuto(codeBlock).value + "</code>\n</Pre>";
            });
        }
        return content.replaceAll("\n", "<br>");
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
