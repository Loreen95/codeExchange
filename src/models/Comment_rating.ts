import "../hicConfig";
import { api } from "@hboictcloud/api";
import { ratingCommentResult } from "../views/types";

export class RatingComment {
    private _ratingId: number;
    private _userId: number;
    private _commentId: number;
    private _ratingType: string | undefined;

    public constructor(ratingId: number, userId: number, commentId: number) {
        this._ratingId = ratingId;
        this._userId = userId;
        this._commentId = commentId;
    }

    public static async getRatingByUserIdAndCommentId(userId: number, commentId: number): Promise<RatingComment | undefined> {
        try {
            const result: ratingCommentResult[] = await api.queryDatabase("SELECT * FROM `comment_rating` WHERE userId = ? And commentId = ?", userId, commentId) as ratingCommentResult[];
            if (result.length > 0) {
                console.log("Huh");
                return new RatingComment(result[0].ratingId, result[0].userId, result[0].commentId);
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

    public async create(userId: number, commentId: number, ratingType: string): Promise<boolean> {
        try {
            const result: ratingCommentResult[] = await api.queryDatabase("INSERT into comment_rating (userId, commentId, ratingType) VALUES (?, ?, ?)", userId, commentId, ratingType) as ratingCommentResult[];
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

    public get commentId(): number {
        return this._commentId;
    }

    public get ratingType(): string | undefined {
        return this._ratingType;
    }
}
