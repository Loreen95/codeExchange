import "../hicConfig";
import { api } from "@hboictcloud/api";
import { ratingResult } from "../views/types";

export class Rating {
    private _ratingId: number;
    private _userId: number;
    private _postId: number;
    private _ratingType: number;

    public constructor(ratingId: number, userId: number, postId: number, ratingType: number) {
        this._ratingId = ratingId;
        this._userId = userId;
        this._postId = postId;
        this._ratingType = ratingType;
    }

    public static async getRatingByUserIdAndCommentId(userId: number, postId: number): Promise<Rating | undefined> {
        try {
            const result: ratingResult[] = await api.queryDatabase("SELECT * FROM `comment_rating` WHERE userId = ? And postId = ?", userId, postId) as ratingResult[];
            if (result.length > 0) {
                console.log("Huh");
                return new Rating(result[0].ratingId, result[0].userId, result[0].postId, result[0].ratingType);
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

    public get ratingId(): number {
        return this._ratingId;
    }

    public get userId(): number {
        return this._userId;
    }

    public get postId(): number {
        return this._postId;
    }

    public get ratingType(): number {
        return this._ratingType;
    }
}
