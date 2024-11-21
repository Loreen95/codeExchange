import { Post } from "../models/Post";
const postModel: Post = new Post(0, 0, "", "", 0, "");
import { PostClass } from "../controllers/PostController";
const post: PostClass = new PostClass();
import UserInterfaceClass from "./interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;
const currentpost: Post | undefined = await postModel.getPostById(Number(sessionStorage.getItem("post_Nr")));

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertPostsHere) {
    await post.renderPosts();
    console.log("trigger1");
}

if (await post.isLoggedInUserResponsibleForThisPost(Number(sessionStorage.getItem("session")), Number(sessionStorage.getItem("post_Nr")))) {
    UI.adjustPageToOwnerStatus(true);
}
else {
    UI.adjustPageToOwnerStatus(false);
}

const insertQuestionNameHere: HTMLHeadElement = document.querySelector("#insertQuestionNameHere")!;
insertQuestionNameHere.innerText = String(currentpost!.getTitle());
