import { Post } from "../models/Post";
const postModel: Post = new Post(0, 0, "", "", 0, "");
import { PostClass } from "../controllers/PostController";
const post: PostClass = new PostClass();
import UserInterfaceClass from "./interface";
const UI: UserInterfaceClass = new UserInterfaceClass();

const titleUserInput: HTMLInputElement = document.querySelector("#titleInput")!;
const contentInput: HTMLInputElement = document.querySelector("#contentInput")!;

const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;
const currentpost: Post | undefined = await postModel.getPostById(Number(sessionStorage.getItem("post_Nr")));

const createBtn: HTMLButtonElement = document.querySelector(".createPost")!;

createBtn.addEventListener("click", async () => {
    // Verkrijg de titel en inhoud van de invoervelden
    const title: string = titleUserInput.value.trim();
    const content: string = contentInput.value.trim();

    // Roep de createPost functie aan om een nieuwe post te maken
    if (title && content) {
        await post.onClickCreate(title, content);
        // Optioneel: Maak de invoervelden leeg nadat de post is aangemaakt
        titleUserInput.value = "";
        contentInput.value = "";
        await post.renderPosts();
    }
    else {
        console.error("Title and content cannot be empty");
    }
});

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

await post.renderPosts();

const insertQuestionNameHere: HTMLHeadElement = document.querySelector("#insertQuestionNameHere")!;
insertQuestionNameHere.innerText = String(currentpost!.getTitle());
