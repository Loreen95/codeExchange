import { PostClass } from "../controllers/PostController";
const Post: PostClass = new PostClass();

const titleUserInput: HTMLInputElement = document.querySelector("#titleInput")!;
const contentInput: HTMLInputElement = document.querySelector("#contentInput")!;

const createBtn: HTMLButtonElement = document.querySelector(".createPost")!;
createBtn.addEventListener("click", async () => {
    await Post.onClickCreate(titleUserInput.value, contentInput.value);
});
