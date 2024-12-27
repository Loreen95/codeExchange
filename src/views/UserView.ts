import { UserInfo } from "../views/types";
import { User } from "../models/User";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { RatingComment } from "../models/Comment_rating";
import { PostController } from "../controllers/PostController";
const post: PostController = new PostController();

export class UserView {
    public view!: HTMLElement;
    public userModel!: User;

    private constructor(userModel: User) {
        const mainElement: HTMLElement | null = document.querySelector("#profileInfo");

        if (!mainElement) {
            console.error("Can't find element profileInfo");
            return;
        }
        this.view = mainElement;
        this.userModel = userModel;
    }

    public static async initialize(): Promise<UserView> {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        if (!userId) {
            throw new Error("Username is required in the URL.");
        }
        const user: User | undefined = await User.getUserById(Number(userId));

        if (!user) {
            throw new Error("User not found.");
        }
        const userView: UserView = new UserView(user);
        return userView;
    }

    public async countPost(): Promise<number> {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        const postCount: number | undefined = await Post.countTotalPostsByUserId(Number(userId));
        return postCount || 0;
    }

    public async countComments(): Promise<number> {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        const commentCount: number | undefined = await Comment.countTotalCommentsByUserId(Number(userId));
        return commentCount || 0;
    }

    public async countRating(): Promise<number> {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        const ratingComment: number | undefined = await RatingComment.countAvgRatingByUserId(Number(userId));
        return ratingComment || 0;
    }

    /**
     * This function renders the userInfo into the view
     * @param userInfo this is the userInfo to be displayed
     */
    public async render(userInfo: UserInfo): Promise<void> {
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        if (userId) {
            const imgUrl: string = userInfo.foto;
            const imageElement: HTMLImageElement | null = document.querySelector("#uploadedImage");
            if (imageElement) {
                imageElement.src = imgUrl;
                imageElement.alt = "Uploaded Profile Picture";
            }
        }
        const postCount: number = await this.countPost();
        const commentCount: number = await this.countComments();
        const ratingCount: number = await this.countRating();
        const insertUsernamesHere: NodeListOf<HTMLHeadingElement> = document.querySelectorAll("#insertNameHere");
        for (let i: number = 0; i < insertUsernamesHere.length; i++) {
            insertUsernamesHere[i].innerText = String(userInfo.userName);
        }

        document.querySelector("#memberSince")!.innerHTML = userInfo.stringedTimeAndDate;
        if (typeof userInfo.dob === "string") {
            if (userInfo.dob === "Niet beschikbaar" || userInfo.dob === "00-00-0000") {
                const bdaythings: NodeListOf<HTMLParagraphElement> = document.querySelectorAll(".bdaythings");
                for (let k: number = 0; k < bdaythings.length; k++) {
                    bdaythings[k].style.display = "none";
                }
            }
            else {
                document.querySelector("#insertBirthdayHere")!.innerHTML = userInfo.dob;
            }
        }
        else if (userInfo.dob instanceof Date) {
            document.querySelector("#insertBirthdayHere")!.innerHTML = userInfo.dob.toISOString().split("T")[0];
        }
        document.querySelector("#insertEmailHere")!.innerHTML = userInfo.userEmail;
        if (userInfo.bio === "Geen biografie beschikbaar") {
            const biobit: HTMLDivElement = document.querySelector(".userBiography")!;
            biobit.style.display = "none";
        }
        else {
            document.querySelector("#insertBiographyHere")!.innerHTML = userInfo.bio;
        }

        const expertise: Element | null = document.querySelector("#expertise");
        if (expertise) {
            expertise.innerHTML = userInfo.expertise;
        }
        else {
            console.warn("No expertise available");
        }
        if (userInfo.yearsExperience > 0) {
            document.querySelector("#yearsExperience")!.innerHTML = String(userInfo.yearsExperience);
        }
        else {
            document.querySelector("#yearsExperience")!.innerHTML = "No data available";
        }
        document.querySelector("#totalPosts")!.innerHTML = String(postCount);
        document.querySelector("#totalComments")!.innerHTML = String(commentCount);
        document.querySelector("#totalRating")!.innerHTML = String(ratingCount);

        const editLink: HTMLLinkElement = document.querySelector("#edit")!;
        editLink.href = `editProfile?user=${userInfo.userId}`;

        const insertPostsHere: HTMLElement | null = document.querySelector(".posts");
        if (insertPostsHere) {
            const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
            const userId: string | null = userUrl.get("user");
            await post.renderPosts("userSpecific", Number(userId));
        }
        post.revealAndHideContentToLoginStatus();
    }
}
