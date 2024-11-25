import { Post } from "../models/Post";
const postModel: Post = new Post(0, 0, "", "", 0, "");
import { PostClass } from "../controllers/PostController";
const post: PostClass = new PostClass();
import UserInterfaceClass from "./interface";
const UI: UserInterfaceClass = new UserInterfaceClass();
import hljs from "highlight.js";

const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;
const currentpost: Post | undefined = await postModel.getPostById(Number(sessionStorage.getItem("post_Nr")));

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertPostsHere) {
    await post.renderPosts();
}
const titleUserInput: HTMLInputElement = document.querySelector("#titleInput")!;
const contentInput: HTMLInputElement = document.querySelector("#contentInput")!;
const createBtn: HTMLButtonElement = document.querySelector(".createPost")!;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (createBtn) {
    createBtn.addEventListener("click", async () => {
        console.log("Button clicked");
        await post.onClickCreate(titleUserInput.value.trim(), contentInput.value.trim());
    });
}

const insertCommenthere: HTMLDivElement = document.querySelector(".awnsers")!;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertCommenthere) {
    await post.renderComments();
}

if (await post.isLoggedInUserResponsibleForThisPost(Number(sessionStorage.getItem("session")), Number(sessionStorage.getItem("post_Nr")))) {
    UI.adjustPageToOwnerStatus(true);
}
else {
    UI.adjustPageToOwnerStatus(false);
}

await post.renderPosts();

const insertQuestionNameHere: HTMLHeadElement = document.querySelector("#insertQuestionNameHere")!;
const questionInfoBits: HTMLParagraphElement = document.querySelector(".questionstats")!;
const ratingCounter: HTMLParagraphElement = document.querySelector(".insertRatingHere")!;
const contentOfPost: HTMLDivElement = document.querySelector(".contentPart")!;
const awnseramount: HTMLHeadElement = document.querySelector("#injectawnseramountHere")!;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertQuestionNameHere) {
    insertQuestionNameHere.innerText = String(currentpost!.getTitle());
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (questionInfoBits) {
    questionInfoBits.innerText = `${await post.getUserName(currentpost!.getAuthorId())}  ${String(currentpost!.getDate()).slice(0, 10) + " | " + String(currentpost!.getDate()).slice(11, 19)}`;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (ratingCounter) {
    if (String(currentpost!.getRating()) === String(null)) {
        ratingCounter.innerText = "0";
    }
    else {
        ratingCounter.innerText = String(currentpost!.getRating());
    }
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (contentOfPost) {
    contentOfPost.innerHTML = post.encodeContentForVieuwingPurposes(currentpost!.getContent());
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (awnseramount) {
    awnseramount.innerHTML = String(await post.getCommentAmount());
}

// const titleUserInput: HTMLInputElement = document.querySelector("#titleInput")!;
// const contentInput: HTMLInputElement = document.querySelector("#contentInput")!;
// const createBtn: HTMLButtonElement = document.querySelector(".createPost")!;

// createBtn.addEventListener("click", async () => {
//     console.log("Button clicked");
//     await post.onClickCreate(titleUserInput.value.trim(), contentInput.value.trim());
// });

hljs.highlightAll();
