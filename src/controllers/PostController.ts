import { Post } from "../models/Post";
const postModel: Post = new Post(0, 0, "", "", 0, "");
import { User } from "../models/User";
const userModel: User = new User(0, "", "", "");

export class PostClass {
    public async renderPosts(): Promise<void> {
        console.log("Hark 2!!!!");
        const postList: Post[] | undefined = await postModel.getAllPosts();

        if (postList) {
            const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;
            postList.forEach(async post => {
                // console.log(`Post ID: ${post.getPostId()}, Author ID: ${post.getAuthorId()}, Title: ${post.getTitle()}, Content: ${post.getContent()}`);
                let titleOfPost: string = "";
                let contentOfPost: string = "";
                const userName: string | undefined = (await userModel.getUserById(Number(post.getAuthorId())))?.getUserName();
                const stringedTimeAndDate: string = String(post.getDate()).slice(0, 10) + " | " + String(post.getDate()).slice(11, 19);
                // when comments are implimented make this show amount of comments of post
                const amountOfComments: number = 0;

                if (post.getTitle().length > 60) {
                    titleOfPost = post.getTitle().slice(0, 60).concat("...");
                }
                else {
                    titleOfPost = post.getTitle();
                }

                if (post.getContent().length > 240) {
                    contentOfPost = post.getContent().slice(0, 240).concat("...");
                }
                else {
                    contentOfPost = post.getContent();
                }

                insertPostsHere.insertAdjacentHTML("beforeend", `
                    <div class="question">
                        <p id="usersname">${userName} asks:</p>
                        <a id="">
                            <div class="questionContent">
                                <h1>${titleOfPost}</h1>
                                <p>${contentOfPost}</p>
                                <div class="bottrow">
                                    <div class="iconrow">
                                        <p class="messageIcon"><i class="fa-solid fa-thumbs-up"></i> ${post.getRating()}</p>
                                        <p class="messageIcon"><i class="fa-sharp fa-solid fa-message"></i> ${amountOfComments}</p>
                                    </div>
                                    <p id="datetime">${stringedTimeAndDate}</p>
                                </div>                                
                            </div>
                        </a>                        
                    </div>
                `);

                console.log(`
                        helo 
                `);
            });
        }
        else {
            console.log("something is wrong");
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
