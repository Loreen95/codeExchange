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

    public static async getRatingById(id: number): Promise<RatingPost | undefined> {
        try {
            const result: ratingPostResult[] = await api.queryDatabase("SELECT * FROM post_rating WHERE ratingId = ?", [id]) as ratingPostResult[];
            if (result.length > 0) {
                const rating: RatingPost = new RatingPost (result[0].ratingId, result[0].userId, result[0].postId);
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

    public async create(userId: number, postId: number, ratingType: string): Promise<RatingPost | undefined> {
        try {
            const result: { insertId: number } = await api.queryDatabase("INSERT into post_rating (userId, postId, ratingType) VALUES (?, ?, ?)", userId, postId, ratingType) as { insertId: number };
            if (result.insertId) {
                console.log("Rating created with ratingId:", result.insertId);

                return await RatingPost.getRatingById(result.insertId);
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

    public static async countTotalRatingByPostId(postId: number): Promise<number> {
        try {
            const positiveResult: { count: number }[] = await api.queryDatabase("SELECT COUNT(*) as count FROM post_rating WHERE postId = ? AND ratingType = 'positive'", postId) as { count: number }[];
            const negativeResult: { count: number }[] = await api.queryDatabase("SELECT COUNT(*) as count FROM post_rating WHERE postId = ? AND ratingType = 'negative'", postId) as { count: number }[];
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
            return 0;
        }
    }

    public async deleteRating(userId: number, postId: number): Promise<boolean> {
        try {
            const result: ratingPostResult[] = await api.queryDatabase("DELETE FROM post_rating WHERE userId = ? AND postId = ?", userId, postId) as ratingPostResult[];
            console.log(`Succesfully deleted: ${this._ratingId} ${userId} ${postId}, ${result}`);
            return true;
        }
        catch (reason) {
            console.error("Error deleting rating", reason);
            return false;
        }
    }

    public async updateRating(ratingType: string, ratingId: number, userId: number, postId: number): Promise<boolean> {
        try {
            const result: ratingPostResult[] = await api.queryDatabase("UPDATE post_rating SET ratingType = ? WHERE ratingId = ? AND userId = ? AND postId = ?", ratingType, ratingId, userId, postId) as ratingPostResult[];
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
