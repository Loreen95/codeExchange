import { Post } from "../models/Post";
import { PostController } from "../controllers/PostController";
import UserInterfaceClass from "./interface";
import hljs from "highlight.js";
import { User } from "../models/User";

const post: PostController = new PostController();
const UI: UserInterfaceClass = new UserInterfaceClass();

const postUrl: URLSearchParams = new URLSearchParams(window.location.search);
const postId: string | null = postUrl.get("post");
sessionStorage.setItem("post_Nr", String(postId));
const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;
const currentpost: Post | undefined = await Post.getPostById(Number(sessionStorage.getItem("post_Nr")));

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertPostsHere) {
    await post.renderPosts();
}
const titleUserInput: HTMLInputElement = document.querySelector("#titleInput")!;
const contentInput: HTMLInputElement = document.querySelector("#contentInput")!;
const createBtn: HTMLButtonElement | null = document.querySelector("#createPost");

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

const editBtn: HTMLButtonElement | null = document.querySelector("#editPost");
if (editBtn) {
    const postTitle: HTMLInputElement = document.querySelector("#titleInput")!;
    const postContent: HTMLTextAreaElement = document.querySelector(".addownAwnsertextarea2")!;
    const theCurrentPost: Post | undefined = await Post.getPostById(Number(postId));
    if (theCurrentPost) {
        postTitle.value = theCurrentPost.title;
        postContent.value = theCurrentPost.content || "test";
    }
    editBtn.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        await post.editPost(Number(postId), titleUserInput.value.trim(), contentInput.value.trim());
    });
}

const insertCommenthere: HTMLDivElement | null = document.querySelector(".awnsers");
if (insertCommenthere) {
    await post.renderComments();
}

if (await post.isLoggedInUserResponsibleForThisPost(Number(sessionStorage.getItem("session")), Number(sessionStorage.getItem("post_Nr")))) {
    UI.adjustPageToOwnerStatus(true);
}
else {
    UI.adjustPageToOwnerStatus(false);
}

const insertQuestionNameHere: HTMLHeadElement | null = document.querySelector("#insertQuestionNameHere");
const questionInfoBits: HTMLParagraphElement | null = document.querySelector(".questionstats");
const ratingCounter: HTMLParagraphElement | null = document.querySelector(".insertRatingHere");
const contentOfPost: HTMLDivElement | null = document.querySelector(".contentPart");
const awnseramount: HTMLHeadElement | null = document.querySelector("#injectawnseramountHere");

if (insertQuestionNameHere) {
    insertQuestionNameHere.innerText = String(currentpost!.title);
}

if (questionInfoBits) {
    if (currentpost) {
        const formattedCreatedAt: string = String(currentpost.createdAt).slice(8, 10) + "-" + String(currentpost.createdAt).slice(5, 7) + "-" + String(currentpost.createdAt).slice(0, 4) + " | " + String(currentpost.createdAt).slice(11, 19);
        const formattedUpdatedAt: string = currentpost.updatedAt ? (String(currentpost.updatedAt).slice(8, 10) + "-" + String(currentpost.updatedAt).slice(5, 7) + "-" + String(currentpost.updatedAt).slice(0, 4) + " | " + String(currentpost.updatedAt).slice(11, 19)) : '';

        let updatedInfo: string = "";
        if (formattedUpdatedAt) {
            updatedInfo = `Edited: ${formattedUpdatedAt}`;
        }

        questionInfoBits.innerHTML = `
            <a href="profile.html?user=${currentpost.authorId}" class="navLink">
                ${await post.getUserName(currentpost.authorId)}
            </a>
            Created: ${formattedCreatedAt}
            ${updatedInfo}
        `;
    }
}

if (ratingCounter && currentpost) {
    const userSession: string | null = sessionStorage.getItem("session");
    const user: User | undefined = await User.getUserById(Number(userSession));
    if (!user) {
        console.error("No user found!");
    }
    else {
        await post.renderPostRating();
    }
}
if (contentOfPost) {
    contentOfPost.innerHTML = post.encodeContentForVieuwingPurposes(currentpost!.content);
}
if (awnseramount) {
    awnseramount.innerHTML = String(await post.getCommentAmount());
}

const editLink: HTMLLinkElement | null = document.querySelector(".editLink");
if (editLink) {
    editLink.href = `editPost?post=${postId}`;
}

// const postTitle: HTMLInputElement = document.querySelector("#titleInput")!;
// const postContent: HTMLTextAreaElement = document.querySelector(".addownAwnsertextarea2")!;
// const theCurrentPost: Post | undefined = await Post.getPostById(Number(postId));
// if (theCurrentPost) {
//     postTitle.value = theCurrentPost.title;
//     postContent.value = theCurrentPost.content || "test";
// }

const currentPage: number = 1; // Begin altijd op pagina 1
const totalPages: number | undefined = await Post.countPages();
if (totalPages) {
    await post.renderPosts(undefined, undefined, undefined, currentPage);
    await post.renderPagination(currentPage, totalPages);
}
else {
    console.error("Could not retrieve the total number of pages.");
}

hljs.highlightAll();

const boldBtn: HTMLButtonElement = document.querySelector(".bold")!;
const italicBtn: HTMLButtonElement = document.querySelector(".italic")!;
const codeBtn: HTMLButtonElement = document.querySelector(".code")!;
const linkBtn: HTMLButtonElement = document.querySelector(".link")!;
const undo: HTMLButtonElement = document.querySelector(".undo")!;
const redo: HTMLButtonElement = document.querySelector(".redo")!;

// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(boldBtn) !== "null") {
    boldBtn.addEventListener("click", e => {
        e.preventDefault();
        const textarea: HTMLTextAreaElement = document.querySelector("#contentInput")!;
        post.addToField(textarea, "<b>", "</b>");
    });
}

// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(italicBtn) !== "null") {
    italicBtn.addEventListener("click", e => {
        e.preventDefault();
        const textarea: HTMLTextAreaElement = document.querySelector("#contentInput")!;
        post.addToField(textarea, "<i>", "</i>");
    });
}

// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(italicBtn) !== "null") {
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
}

// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(codeBtn) !== "null") {
    codeBtn.addEventListener("click", e => {
        e.preventDefault();
        const textarea: HTMLTextAreaElement = document.querySelector("#contentInput")!;
        post.addToField(textarea, "[code]", "[/code]");
    });
}

// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(undo) !== "null") {
    undo.addEventListener("click", e => {
        e.preventDefault();
        post.undoAction();
    });
}

// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(redo) !== "null") {
    redo.addEventListener("click", e => {
        e.preventDefault();
        post.redoAction();
    });
}

const unleashCommentPlate: HTMLAnchorElement = document.querySelector("#createAnswer")!;
if (String(unleashCommentPlate) !== "null") {
    unleashCommentPlate.addEventListener("click", () => {
        post.unleashAddComentPanel();
    });
}

const closePanelBackUp: HTMLAnchorElement = document.querySelector(".closePanel")!;
if (String(closePanelBackUp) !== "null") {
    closePanelBackUp.addEventListener("click", () => {
        post.unleashAddComentPanel();
    });
}

const ratingPositive: HTMLLinkElement = document.querySelector("#postPositive")!;
const ratingNegative: HTMLLinkElement = document.querySelector("#postNegative")!;

// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(ratingPositive) !== "null") {
    ratingPositive.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        await post.rateThePost("positive").then(async () => {
            await post.renderPostRating();
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(ratingNegative) !== "null") {
    ratingNegative.addEventListener("click", async (e: Event) => {
        e.preventDefault();
        await post.rateThePost("negative").then(async () => {
            await post.renderPostRating();
        });
    });
}

// this is the filter related functionality
const openAndCloseFilters: HTMLDivElement = document.querySelector(".openAndCloseFilters")!;
// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(openAndCloseFilters) !== "null") {
    openAndCloseFilters.addEventListener("click", () => {
        post.openAndCloseFilters();
    });
}

const wordsearchBttn: HTMLButtonElement = document.querySelector(".wordFilterBttn")!;
const wordsearchInput: HTMLInputElement = document.querySelector("#wordFilter")!;
// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(wordsearchBttn) !== "null") {
    wordsearchBttn.addEventListener("click", async () => {
        await post.renderPosts("postsByWordInContent", 0, wordsearchInput.value);
    });
}

const expertiseFilterBttn: HTMLButtonElement = document.querySelector(".expertiseFilterBttn")!;
const expertiseFilter: HTMLInputElement = document.querySelector("#expertiseFilter")!;
// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(expertiseFilterBttn) !== "null") {
    expertiseFilterBttn.addEventListener("click", async () => {
        await post.renderPosts("postsByWordInUserExpertise", 0, expertiseFilter.value);
    });
}

const filterOutNoComments: HTMLButtonElement = document.querySelector(".filterOutNoComments")!;
// eslint-disable-next-line @typescript-eslint/no-base-to-string
if (String(filterOutNoComments) !== "null") {
    filterOutNoComments.addEventListener("click", async () => {
        await post.renderPosts("commentedOnly");
    });
}
