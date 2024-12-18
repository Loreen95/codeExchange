import "../hicConfig";
import { api } from "@hboictcloud/api";
import { RatingCommentResult } from "../views/types";

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

    public static async getRatingById(id: number): Promise<RatingComment | undefined> {
        try {
            const result: RatingCommentResult[] = await api.queryDatabase("SELECT * FROM comment_rating WHERE ratingId = ?", [id]) as RatingCommentResult[];
            if (result.length > 0) {
                const rating: RatingComment = new RatingComment (result[0].ratingId, result[0].userId, result[0].commentId);
                rating.ratingType = result[0].ratingType;
                return rating;
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("Error fetching Rating", reason);
            return undefined;
        }
    }

    public static async getRatingByUserIdAndcommentId(userId: number, commentId: number): Promise<RatingComment | undefined> {
        try {
            const result: RatingCommentResult[] = await api.queryDatabase("SELECT * FROM `comment_rating` WHERE userId = ? And commentId = ?", userId, commentId) as RatingCommentResult[];
            if (result.length > 0) {
                console.log(result[0].ratingId, result[0].userId, result[0].commentId, result[0].ratingType);
                const ratingComment: RatingComment = new RatingComment(result[0].ratingId, result[0].userId, result[0].commentId);
                ratingComment.ratingType = result[0].ratingType;
                return ratingComment;
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

    public async create(userId: number, commentId: number, ratingType: string): Promise<RatingComment | undefined> {
        try {
            const result: { insertId: number } = await api.queryDatabase("INSERT into comment_rating (userId, commentId, ratingType) VALUES (?, ?, ?)", userId, commentId, ratingType) as { insertId: number };
            if (result.insertId) {
                console.log("Rating created with ratingId:", result.insertId);

                return await RatingComment.getRatingById(result.insertId);
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("Error creating rating", reason);
            return undefined;
        }
    }

    public static async countTotalRatingBycommentId(commentId: number): Promise<number> {
        try {
            const positiveResult: { count: number }[] = await api.queryDatabase("SELECT COUNT(*) as count FROM comment_rating WHERE commentId = ? AND ratingType = 'positive'", commentId) as { count: number }[];
            const negativeResult: { count: number }[] = await api.queryDatabase("SELECT COUNT(*) as count FROM comment_rating WHERE commentId = ? AND ratingType = 'negative'", commentId) as { count: number }[];
            if (positiveResult.length > 0 || negativeResult.length > 0) {
                return positiveResult[0].count - negativeResult[0].count || 0;
            }
            else {
                console.error("No results found");
                return 0;
            }
        }
        catch (reason) {
            console.error("Error fetching result", reason);
            return 0; // Bij een fout retourneren we 0
        }
    }

    public async deleteRating(userId: number, commentId: number): Promise<boolean> {
        try {
            const result: RatingCommentResult[] = await api.queryDatabase("DELETE FROM comment_rating WHERE userId = ? AND commentId = ?", userId, commentId) as RatingCommentResult[];
            console.log(`Succesfully deleted: ${this._ratingId} ${userId} ${commentId}, ${result}`);
            return true;
        }
        catch (reason) {
            console.error("Error deleting rating", reason);
            return false;
        }
    }

    public async updateRating(ratingType: string, ratingId: number, userId: number, commentId: number): Promise<boolean> {
        try {
            const result: RatingCommentResult[] = await api.queryDatabase("UPDATE comment_rating SET ratingType = ? WHERE ratingId = ? AND userId = ? AND commentId = ?", ratingType, ratingId, userId, commentId) as RatingCommentResult[];
            console.log("Success", result);
            return true;
        }
        catch (reason) {
            console.error("Error updating rating", reason);
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

    public set ratingType(ratingType: string | undefined) {
        this._ratingType = ratingType;
    }
}
