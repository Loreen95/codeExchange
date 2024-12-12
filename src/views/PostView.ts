import { Post } from "../models/Post";
import { PostController } from "../controllers/PostController";
import UserInterfaceClass from "./interface";
import hljs from "highlight.js";

const post: PostController = new PostController();
const UI: UserInterfaceClass = new UserInterfaceClass();

const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;
const currentpost: Post | undefined = await Post.getPostById(Number(sessionStorage.getItem("post_Nr")));

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertPostsHere) {
    await post.renderPosts();
}
const titleUserInput: HTMLInputElement = document.querySelector("#titleInput")!;
const contentInput: HTMLInputElement = document.querySelector("#contentInput")!;
const createBtn: HTMLButtonElement = document.querySelector("#createPost")!;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (createBtn) {
    createBtn.addEventListener("click", async () => {
        await post.onClickCreate(titleUserInput.value.trim(), contentInput.value.trim());
    });
}

const submitBtn: HTMLButtonElement | null = document.querySelector("#postAwnser");

if (submitBtn) {
    submitBtn.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        await post.onClickSubmit(contentInput.value.trim());
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

const insertQuestionNameHere: HTMLHeadElement = document.querySelector("#insertQuestionNameHere")!;
const questionInfoBits: HTMLParagraphElement = document.querySelector(".questionstats")!;
const ratingCounter: HTMLParagraphElement = document.querySelector(".insertRatingHere")!;
const contentOfPost: HTMLDivElement = document.querySelector(".contentPart")!;
const awnseramount: HTMLHeadElement = document.querySelector("#injectawnseramountHere")!;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertQuestionNameHere) {
    insertQuestionNameHere.innerText = String(currentpost!.title);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (questionInfoBits) {
    questionInfoBits.innerHTML = `<a href="profile.html?user=${currentpost!.authorId}" class="navLink">${await post.getUserName(currentpost!.authorId)}</a>  ${String(currentpost!.createdAt).slice(8, 10) + "-" + String(currentpost!.createdAt).slice(5, 7) + "-" + String(currentpost!.createdAt).slice(0, 4) + " | " + String(currentpost!.createdAt).slice(11, 19)}`;
}
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (ratingCounter) {
    if (String(currentpost!.rating) === String(null)) {
        ratingCounter.innerText = "0";
    }
    else {
        ratingCounter.innerText = String(currentpost!.rating);
    }
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (contentOfPost) {
    contentOfPost.innerHTML = post.encodeContentForVieuwingPurposes(currentpost!.content);
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (awnseramount) {
    awnseramount.innerHTML = String(await post.getCommentAmount());
}

hljs.highlightAll();

const boldBtn: HTMLButtonElement = document.querySelector(".bold")!;
const italicBtn: HTMLButtonElement = document.querySelector(".italic")!;
const codeBtn: HTMLButtonElement = document.querySelector(".code")!;
const linkBtn: HTMLButtonElement = document.querySelector(".link")!;
const undo: HTMLButtonElement = document.querySelector(".undo")!;
const redo: HTMLButtonElement = document.querySelector(".redo")!;

boldBtn.addEventListener("click", e => {
    e.preventDefault();
    const textarea: HTMLTextAreaElement = document.querySelector("#contentInput")!;
    post.addToField(textarea, "<b>", "</b>");
});

italicBtn.addEventListener("click", e => {
    e.preventDefault();
    const textarea: HTMLTextAreaElement = document.querySelector("#contentInput")!;
    post.addToField(textarea, "<i>", "</i>");
});

linkBtn.addEventListener("click", e => {
    e.preventDefault();
    const textarea: HTMLTextAreaElement = document.querySelector("#contentInput")!;

    // Verkrijg de geselecteerde tekst in de textarea
    const selection: string = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd).trim();
    // Als er geen selectie is, vraag de gebruiker om een URL in te voeren
    const urlToAdd: string = selection;
    if (urlToAdd) {
        // Voeg de URL als platte tekst toe in de textarea, zonder de <a> tags
        post.addToField(textarea, urlToAdd, "");
    }
    else {
        console.error("De ingevoerde tekst is geen geldige URL.");
    }
});

codeBtn.addEventListener("click", e => {
    e.preventDefault();
    const textarea: HTMLTextAreaElement = document.querySelector("#contentInput")!;
    post.addToField(textarea, "[code]", "[/code]");
});

undo.addEventListener("click", e => {
    e.preventDefault();
    post.undoAction();
});

redo.addEventListener("click", e => {
    e.preventDefault();
    post.redoAction();
});

const unleashCommentPlate: HTMLAnchorElement = document.querySelector("#createAnswer")!;
unleashCommentPlate.addEventListener("click", () => {
    post.unleashAddComentPanel();
});

const closePanelBackUp: HTMLAnchorElement = document.querySelector(".closePanel")!;
closePanelBackUp.addEventListener("click", () => {
    post.unleashAddComentPanel();
});

const ratingPositive: HTMLLinkElement = document.querySelector("#commentPositive")!;
const ratingNegative: HTMLLinkElement = document.querySelector("#commentNegative")!;

ratingPositive.addEventListener("click", e => {
    e.preventDefault();
    post.rate("positive");
});

ratingNegative.addEventListener("click", e => {
    e.preventDefault();
    post.rate("negative");
});
