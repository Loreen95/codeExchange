import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { User } from "../models/User";
import UserInterfaceClass from "../views/interface";
import hljs from "highlight.js";
import validator from "validator";
import { RatingPost } from "../models/Post_rating";
import { RatingComment } from "../models/Comment_rating";
// import { ratingResult } from "../views/types";

export class PostController {
    private _postModel: Post | undefined;
    private _commentModel: Comment | undefined;
    private _UI: UserInterfaceClass;
    private _ratingPostModel: RatingPost | undefined;

    public constructor() {
        this._UI = new UserInterfaceClass();
    }

    public async getUserName(ID: number): Promise<string> {
        const user: User | undefined = await User.getUserById(Number(ID));
        // Als de gebruiker bestaat, return de username
        if (user) {
            return user.userName;
        }
        return "";
    }

    public async getCommentAmount(): Promise<number | undefined> {
        const totalComments: number = (await Comment.getCommentsByMessageId(Number(sessionStorage.getItem("post_Nr")))).length;
        return totalComments;
    }

    public async renderPosts(selectionMethod?: string, possibleUserId?: number): Promise<void> {
        let postList: Post[] | undefined = await Post.getAllPosts();
        if (selectionMethod === "userSpecific") {
            if (possibleUserId) {
                postList = await Post.getAllPostsByUserId(possibleUserId);
                console.log(postList);
            }
        }
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
                const userName: string | undefined = (await User.getUserById(Number(post.authorId)))?.userName;
                const userId: number | undefined = post.authorId;
                const stringedTimeAndDate: string = String(post.createdAt).slice(8, 10) + "-" + String(post.createdAt).slice(5, 7) + "-" + String(post.createdAt).slice(0, 4) + " | " + String(post.createdAt).slice(11, 19);
                let countRating: number | undefined = await RatingPost.countTotalRatingByUserIdAndPostId(userId, postIndex);
                // let rating: number = 0;
                if (countRating) {
                    countRating = post.rating;
                }

                titleOfPost = post.title.length > 60 ? post.title.slice(0, 60).concat("...") : post.title;
                if (post.content.includes("[code]")) {
                    const cutoffValue: number = post.content.indexOf("[code]");
                    contentOfPost = post.content.slice(0, cutoffValue);
                }
                else {
                    contentOfPost = post.content.length > 240 ? post.content.slice(0, 240).concat("...") : post.content;
                }

                const comments: Comment[] = await Comment.getCommentsByMessageId(post.postId);
                const totalComments: number = comments.length;
                const existingRating: RatingPost | undefined = await RatingPost.getRatingByUserIdAndPostId(userId, post.postId);
                const negativeButton: HTMLAnchorElement = document.querySelector("#postNegative")!;
                const positiveButton: HTMLAnchorElement = document.querySelector("#postPositive")!;
                if (existingRating) {
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (negativeButton) {
                        negativeButton.style.color = "";
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    if (positiveButton) {
                        positiveButton.style.color = "";
                    }
                    if (existingRating.ratingType === "negative") {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        if (negativeButton) {
                            negativeButton.style.color = "#9f1414";
                        }
                    }
                    if (existingRating.ratingType === "positive") {
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                        if (positiveButton) {
                            positiveButton.style.color = "#096409";
                        }
                    }
                }
                // the anchor (<a>) tag around the post must be a div or it breaks, (doesn't do anything when clicked on)
                insertPostsHere.insertAdjacentHTML("beforeend", `
                    <div class="question">
                        <a href="profile.html?user=${userId}" class="navLink" id="whoAsked">${userName}: <p data-translate="asks"></p></a>
                        <div id="postNr${postIndex}" class="navLink" href="post?post=${post.postId}">
                            <div class="questionContent">
                                <h1>${titleOfPost}</h1>
                                <p>${contentOfPost}</p>
                                <div class="bottrow">                                  
                                    <div class="iconrow">
                                        <a id="commentPositive"><p class="messageIcon"><i class="fa-solid fa-thumbs-up"></i>${countRating}</p></a>
                                        <p class="messageIcon"><i class="fa-sharp fa-solid fa-message"></i> ${totalComments}</p>
                                    </div>
                                    <p id="datetime">${stringedTimeAndDate}</p>
                                </div>                                  
                            </div>
                        </div>                  
                    </div>
                `);

                const postElement: Element | null = insertPostsHere.querySelector(`#postNr${postIndex}`);
                if (postElement) {
                    postElement.addEventListener("click", () => {
                        const postId: number = post.postId;
                        sessionStorage.setItem("post_Nr", String(postId));
                        window.location.href = `http://localhost:3000/post?post=${postId}`;
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
        const commentList: Comment[] | undefined = await Comment.getCommentsByMessageId(Number(sessionStorage.getItem("post_Nr")));
        commentList.forEach(async _comment => {
            let rating: number | undefined = 0;
            if (String(_comment.rating) !== String(null)) {
                rating = _comment.rating;
            }
            console.log("Comment:", _comment.commentId);
            insertCommenthere.insertAdjacentHTML("beforeend", `
                <h1 class="awnserTitle"><a href="profile.html?user=${(await User.getUserById(Number(_comment.userId)))?.userId}" class="navLinkR">${(await User.getUserById(Number(_comment.userId)))?.userName}</a></h1>
                <p id="expertise2">${(await User.getUserById(Number(_comment.userId)))?.expertise || "No expertise added"} | ${(await User.getUserById(Number(_comment.userId)))?.yearsExperience || "No experience added"}</p>
                <div class="indivAwnser">
                    <div class="contentPart contentPartComment">${this.encodeContentForVieuwingPurposes(_comment.content)}</div>
                </div>
                <div class="dateAndRating">
                    <p class="bottomDate">${String(_comment.createdAt).slice(8, 10) + "-" + String(_comment.createdAt).slice(5, 7) + "-" + String(_comment.createdAt).slice(0, 4) + " | " + String(_comment.createdAt).slice(11, 19)}</p>
                    <div class="ratingPart">
                        <a id="commentPositive-${_comment.commentId}" href="#${_comment.commentId}" class="navLink">
                            <i class="fa-solid fa-thumbs-up" id="positive"></i>
                        </a>
                        <p class="insertRatingHere" id="ratingText">${rating || 0}</p>
                        <a id="commentNegative-${_comment.commentId}" href="#${_comment.commentId}" class="navLink">
                            <i class="fa-solid fa-thumbs-down" id="negative"></i>
                        </a>
                    </div>
                </div>                
                <hr>
            `);
            // Add event listeners for the rating buttons after the comment is rendered
            // const positiveButton: HTMLLinkElement | null = document.querySelector(`#commentPositive-${_comment.commentId}`);
            // const negativeButton: HTMLLinkElement | null = document.querySelector(`#commentNegative-${_comment.commentId}`);
            // if (positiveButton) {
            //     positiveButton.addEventListener("click", async (e: Event) => {
            //         e.preventDefault();
            //         console.log("Positive, clicked");
            //         await this.rateComment("positive", _comment.commentId);
            //     });
            // }
            // if (negativeButton) {
            //     negativeButton.addEventListener("click", async (e: Event) => {
            //         e.preventDefault();
            //         console.log("Negative, clicked");
            //         await this.rateComment("negative", _comment.commentId);
            //     });
            // }
        });
    }

    /**
     * unleashAddComentPanel
     */
    private _isPanelVisible: boolean = false;
    public unleashAddComentPanel(): void {
        const commentMakerPanel: HTMLDivElement = document.querySelector(".addOwnAwnser")!;
        if (this._isPanelVisible) {
            this._isPanelVisible = false;
            commentMakerPanel.style.display = "none";
            console.log("fuegoFalse");
        }
        else {
            if (!sessionStorage.getItem("session")) {
                window.location.href = "http://localhost:3000/login.html";
            }
            else {
                this._isPanelVisible = true;
                commentMakerPanel.style.display = "flex";
                console.log("fuegoTrue");
            }
        }
    }

    public async isLoggedInUserResponsibleForThisPost(usersId: number, viewingPostId: number): Promise<boolean> {
        const currentpost: Post | undefined = await Post.getPostById(viewingPostId);
        if (usersId === currentpost!.authorId) {
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

            errorMessage.innerHTML = "";
            successMessage.innerHTML = "";

            if (!title || !content) {
                errorMessage.innerHTML += "You must add a title and message!";
                this._UI.unleashTheErrorPopup(true);
                return;
            }

            const userId: string | null = sessionStorage.getItem("session");
            if (!userId) {
                errorMessage.innerHTML += "You must be logged in!";
                this._UI.unleashTheErrorPopup(true);
                return;
            }

            const user: User | undefined = await User.getUserById(Number(userId));
            if (!user) {
                errorMessage.innerHTML += "User not found!";
                this._UI.unleashTheErrorPopup(true);
                return;
            }

            this._postModel = new Post(0, Number(userId), title, content);
            const isPostCreated: Post | undefined = await this._postModel.create(Number(userId), title, content);

            if (isPostCreated) {
                const postId: number = isPostCreated.postId;
                console.log("Redirecting to post with ID:", postId);
                successMessage.innerHTML = `Post created successfully! Redirecting to post ${postId}`;
                this._UI.unleashTheErrorPopup(false);
                this._UI.successMessagePopup(true);
                if (postId) {
                    await this.renderPosts();
                    sessionStorage.setItem("post_Nr", String(postId));
                    setTimeout(() => {
                        window.location.href = `http://localhost:3000/post?post=${postId}`;
                    }, 1500);
                }
                else {
                    errorMessage.innerHTML += "Failed to create the post!";
                    this._UI.unleashTheErrorPopup(true);
                }
            }
            else {
                errorMessage.innerHTML += "Failed to create the post!";
                this._UI.unleashTheErrorPopup(true);
            }
        }
        catch (reason) {
            console.error("Error creating post!", reason);

            const errorMessage: HTMLParagraphElement | null = document.querySelector("#errMsg");
            if (errorMessage) {
                errorMessage.innerHTML = "An error occurred while creating the post.";
                this._UI.unleashTheErrorPopup(true);
            }
        }
    }

    public encodeContentForVieuwingPurposes(content: string): string {
        if (content.includes("[code]")) {
            content = content.replaceAll(/\[code\]((?:.|\s)*?)\[\/code\]/g, codeBlock => {
                codeBlock = codeBlock.replaceAll("[code]", "");
                codeBlock = codeBlock.replaceAll("[/code]", "");
                return "<Pre>\n<code>" + hljs.highlightAuto(codeBlock).value + "</code>\n</Pre>";
            });
        }
        return content;
    }

    public async onClickSubmit(content: string): Promise<void> {
        try {
            const errorMessage: HTMLParagraphElement | null = document.querySelector("#errMsg");
            const successMessage: HTMLParagraphElement | null = document.querySelector("#successMsg");

            if (!errorMessage || !successMessage) {
                console.error("Error and success message elements not found.");
                return;
            }

            errorMessage.innerHTML = "";
            successMessage.innerHTML = "";

            if (!content) {
                errorMessage.innerHTML = "You must add a message!";
                this._UI.unleashTheErrorPopup(true);
                return;
            }

            const session: string | null = sessionStorage.getItem("session");
            if (!session) {
                errorMessage.innerHTML = "You must be logged in!";
                this._UI.unleashTheErrorPopup(true);
                return;
            }

            const user: User | undefined = await User.getUserById(Number(sessionStorage.getItem("session")));
            if (!user) {
                errorMessage.innerHTML = "User not found!";
                this._UI.unleashTheErrorPopup(true);
                return;
            }

            const postUrl: URLSearchParams = new URLSearchParams(window.location.search);
            const postId: string | null = postUrl.get("post");
            const post: Post | undefined = await Post.getPostById(Number(postId));
            if (!post) {
                errorMessage.innerHTML = "Error finding original post!";
                this._UI.unleashTheErrorPopup(true);
                return;
            }

            this._commentModel = new Comment(0, user.userId, post.postId, content);
            const isCommentCreated: boolean = await this._commentModel.create(user.userId, post.postId, content);

            if (isCommentCreated) {
                successMessage.innerHTML = "Comment created successfully!";
                this._UI.unleashTheErrorPopup(false);
                this._UI.successMessagePopup(true);
                await this.renderComments();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
            else {
                errorMessage.innerHTML += "Failed to create the post!";
                this._UI.unleashTheErrorPopup(true);
            }
            successMessage.innerHTML = "Comment submitted successfully!";
            this._UI.unleashTheErrorPopup(false);
        }
        catch (reason) {
            console.error("Error submitting comment:", reason);
            const errorMessage: HTMLParagraphElement | null = document.querySelector("#errMsg");
            if (errorMessage) {
                errorMessage.innerHTML = "An unexpected error occurred. Please try again.";
            }
            this._UI.unleashTheErrorPopup(true);
        }
    }

    /**
     * revealAndHideContentToLoginStatus
     */
    public revealAndHideContentToLoginStatus(): void {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        if (Number(sessionStorage.getItem("session")) === Number(userId)) {
            console.log("wegotta match");
        }
        else {
            console.log("no match");
            const onlyShowThisToCorrectUser: NodeListOf<HTMLElement> = document.querySelectorAll(".onlyForOwnerOfAccount");
            for (let o: number = 0; o < onlyShowThisToCorrectUser.length; o++) {
                onlyShowThisToCorrectUser[o].style.display = "none";
            }
        }
    }

    public addToField(textarea: HTMLTextAreaElement, start: string, end: string): void {
        const position: number = textarea.scrollTop;
        const startPosition: number = textarea.selectionStart || 0;
        const endPosition: number = textarea.selectionEnd || 0;
        const currentText: string = textarea.value;

        const isEmptySelection: boolean = startPosition === endPosition;
        const before: string = currentText.substring(0, startPosition);
        const selection: string = isEmptySelection ? "" : currentText.substring(startPosition, endPosition);
        const after: string = currentText.substring(endPosition);
        const urlValidationOptions: { protocols: string[]; require_protocol: boolean; require_valid_protocol: boolean;
            allow_underscores: boolean; validate_length: boolean; } = { protocols: ["http", "https", "www"],
            require_protocol: true, require_valid_protocol: true, allow_underscores: false, validate_length: true,
        };
        if (start === "<a href='" && end === "'></a>") {
            if (!validator.isURL(selection, urlValidationOptions)) {
                console.error("De geselecteerde tekst is geen geldige URL.");
                return;
            }
        }
        const textToInsert: string = `${before}${start}${selection}${end}${after}`;
        const urlRegex: RegExp = /(https?:\/\/[^\s]+)/g;
        const transformedText: string = textToInsert.replace(urlRegex, match => {
            const url: string = match;

            const clickableElement: HTMLElement = document.createElement("span");
            clickableElement.innerText = url;
            clickableElement.style.color = "blue"; // Zet de linkstijl
            clickableElement.style.textDecoration = "underline"; // Onderstreping voor de link

            clickableElement.addEventListener("click", () => {
                window.open(url, "_blank"); // Open de URL in een nieuw tabblad
            });
            return clickableElement.outerHTML;
        });
        textarea.value = transformedText;
        if (isEmptySelection) {
            textarea.selectionStart = startPosition + start.length;
            textarea.selectionEnd = startPosition + start.length;
        }
        else {
            textarea.selectionStart = startPosition + start.length;
            textarea.selectionEnd = endPosition + start.length;
        }
        textarea.scrollTop = position;
    }

    public undoAction(): void {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        document.execCommand("undo", false);
    }

    public redoAction(): void {
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        document.execCommand("redo", true);
    }

    public async rateThePost(typeRating: string): Promise<void> {
        try {
            const userSession: string | null = sessionStorage.getItem("session");
            const user: User | undefined = await User.getUserById(Number(userSession));
            if (!user) {
                console.error("No user found!");
            }
            else {
                const postUrl: URLSearchParams = new URLSearchParams(window.location.search);
                const postIdFromUrl: string | null = postUrl.get("post");
                const post: Post | undefined = await Post.getPostById(Number(postIdFromUrl));
                if (!post) {
                    console.log("Post not found");
                    return;
                }
                this._ratingPostModel = new RatingPost(0, user.userId, post.postId);
                const existingRating: RatingPost | undefined = await RatingPost.getRatingByUserIdAndPostId(user.userId, post.postId);
                const currentRating: RatingPost | undefined = await RatingPost.getRatingById(this._ratingPostModel.ratingId);
                console.log(currentRating);
                if (!existingRating) {
                    await this._ratingPostModel.create(user.userId, post.postId, typeRating);
                }
                else {
                    if (existingRating.ratingType === "positive" && typeRating === "positive") {
                        await this._ratingPostModel.deleteRating(user.userId, post.postId);
                    }
                    else if (existingRating.ratingType === "negative" && typeRating === "negative") {
                        await this._ratingPostModel.deleteRating(user.userId, post.postId);
                    }
                    else if (existingRating.ratingType === "positive" && typeRating === "negative") {
                        await this._ratingPostModel.updateRating(typeRating, existingRating.ratingId, user.userId, post.postId);
                    }
                    else if (existingRating.ratingType === "negative" && typeRating === "positive") {
                        await this._ratingPostModel.updateRating(typeRating, existingRating.ratingId, user.userId, post.postId);
                    }
                    window.location.reload();
                }
            }
        }
        catch (reason) {
            console.error("Hello there", reason);
        }
    }
    
    public async rateComment(typeRating: string, commentId: number): Promise<void> {
        try {
            const userSession: string | null = sessionStorage.getItem("session");
            if (!userSession) {
                console.error("User is not logged in.");
                return;
            }
            const userId: User | undefined = await User.getUserById(Number(userSession));
            const comment: Comment | undefined = await Comment.getCommentById(commentId);
            if (!comment) {
                console.log("Comment not found");
                return;
            }
            const negativeComment: HTMLElement = document.querySelector("#negative")!;
            const positivecomment: HTMLElement = document.querySelector("#positive")!;
            const existingRating: RatingComment | undefined = await RatingComment.getRatingByUserIdAndcommentId(Number(userId), commentId);
            let newRating: number = comment.rating || 0;
            if (typeRating === "positive") {
                newRating++;
            }
            else if (typeRating === "negative") {
                newRating--;
            }
            if (existingRating) {
                if (existingRating.ratingType === "negative") {
                    negativeComment.style.color = "red";
                    return;
                }
                else if (existingRating.ratingType === "positive") {
                    positivecomment.style.color = "green";
                    return;
                }
            }
            else {
                await new RatingComment(0, Number(userId), commentId).create(Number(userId), commentId, typeRating);
            }
            comment.rating = newRating;
            // window.location.reload();
        }
        catch (error) {
            console.error("Error updating the rating:", error);
        }
    }
}
