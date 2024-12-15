import "../hicConfig";
import { api } from "@hboictcloud/api";
import { ratingPostResult } from "../views/types";

export class RatingPost {
    private _ratingId: number;
    private _userId: number;
    private _postId: number;
    private _ratingType: string | undefined;

    public constructor(ratingId: number, userId: number, postId: number) {
        this._ratingId = ratingId;
        this._userId = userId;
        this._postId = postId;
    }

    public static async getRatingByUserIdAndPostId(userId: number, postId: number): Promise<RatingPost | undefined> {
        try {
            const result: ratingPostResult[] = await api.queryDatabase("SELECT * FROM `post_rating` WHERE userId = ? And postId = ?", userId, postId) as ratingPostResult[];
            if (result.length > 0) {
                console.log(result[0].ratingId, result[0].userId, result[0].postId, result[0].ratingType);
                const ratingPost: RatingPost = new RatingPost(result[0].ratingId, result[0].userId, result[0].postId);
                ratingPost.ratingType = result[0].ratingType;
                return ratingPost;
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while searching for ratings.", reason);
            return undefined;
        }
    }

    public async create(userId: number, postId: number, ratingType: string): Promise<boolean> {
        try {
            const result: ratingPostResult[] = await api.queryDatabase("INSERT into post_rating (userId, postId, ratingType) VALUES (?, ?, ?)", userId, postId, ratingType) as ratingPostResult[];
            console.log("Success", result);
            return true;
        }
        catch (reason) {
            console.error("Error creating rating", reason);
            return false;
        }
    }

    public get ratingId(): number {
        return this._ratingId;
    }

    public get userId(): number {
        return this._userId;
    }

    public get postId(): number {
        return this._postId;
    }

    public get ratingType(): string | undefined {
        return this._ratingType;
    }

    public set ratingType(ratingType: string | undefined) {
        this._ratingType = ratingType;
    }
}
