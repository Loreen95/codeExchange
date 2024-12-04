import { UserInfo } from "../views/types";
import { User } from "../models/User";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";

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
        const userModel: User = new User(0, "", "", "");
        const userId: string | null = userUrl.get("user");
        if (!userId) {
            throw new Error("Username is required in the URL.");
        }
        const user: User | undefined = await userModel.getUserById(Number(userId));

        if (!user) {
            throw new Error("User not found.");
        }
        const userView: UserView = new UserView(user);
        return userView;
    }

    // Fix the return type of the countPost method
    public async countPost(): Promise<number> {
        const postModel: Post = new Post(0, 0, "", "", 0, "");
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        const postCount: number | undefined = await postModel.countTotalPostsByUserId(Number(userId));
        return postCount || 0; // Return 0 if no posts found
    }

    public async countComments(): Promise<number> {
        const commentModel: Comment = new Comment(0, 0, 0, "", "", 0, "");
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        const commentCount: number | undefined = await commentModel.countTotalCommentsByUserId(Number(userId));
        return commentCount || 0;
    }

    public async countRating(): Promise<number> {
        const postModel: Post = new Post(0, 0, "", "", 0, "");
        const commentModel: Comment = new Comment(0, 0, 0, "", "", 0, "");
        const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
        const userId: string | null = userUrl.get("user");
        const ratingPost: number | undefined = await postModel.countTotalRatingByUserId(Number(userId));
        const ratingComment: number | undefined = await commentModel.countTotalRatingByUserId(Number(userId));
        const totalRating: number = (ratingPost ?? 0) + (ratingComment ?? 0);
        return totalRating || 0;
    }

    public async render(userInfo: UserInfo): Promise<void> {
        const postCount: number = await this.countPost();
        const commentCount: number = await this.countComments();
        const ratingCount: number = await this.countRating();
        const insertUsernamesHere: NodeListOf<HTMLHeadingElement> = document.querySelectorAll("#insertNameHere");
        for (let i: number = 0; i < insertUsernamesHere.length; i++) {
            insertUsernamesHere[i].innerText = String(userInfo.userName);
        }
        document.querySelector("#memberSince")!.innerHTML = userInfo.stringedTimeAndDate;
        document.querySelector("#insertBirthdayHere")!.innerHTML = userInfo.dob;
        document.querySelector("#insertEmailHere")!.innerHTML = userInfo.userEmail;
        document.querySelector("#insertBiographyHere")!.innerHTML = userInfo.bio;
        document.querySelector("#totalPosts")!.innerHTML = String(postCount);
        document.querySelector("#totalComments")!.innerHTML = String(commentCount);
        document.querySelector("#totalRating")!.innerHTML = String(ratingCount);
    }
}
