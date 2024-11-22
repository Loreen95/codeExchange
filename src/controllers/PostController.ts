import { Post } from "../models/Post";
const postModel: Post = new Post(0, 0, "", "", 0, "");
import { Comment } from "../models/Comment";
const commentModel: Comment = new Comment(0, 0, 0, "", "", 0, "");
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "");

export class PostClass {
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
                                        <p class="messageIcon"><i class="fa-solid fa-thumbs-up"></i> ${post.getRating()}</p>
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
