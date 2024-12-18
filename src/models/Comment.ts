import "../hicConfig";
import { api } from "@hboictcloud/api";
import { CommentResult } from "../views/types";

export class Comment {
    private _commentId: number;
    private _userId: number;
    private _messageId: number;
    private _content: string;
    private _rating: number | undefined;
    private _createdAt: string | undefined;

    // constructor:
    public constructor(commentId: number, userId: number, messageId: number, content: string) {
        this._commentId = commentId;
        this._userId = userId;
        this._messageId = messageId;
        this._content = content;
    }

    // CRUD methods:
    public static async getCommentsByMessageId(id: number): Promise<Comment[]> {
        try {
            const result: CommentResult[] = await api.queryDatabase(
                "SELECT * FROM comment WHERE messageId = ? ORDER BY createdAt DESC",
                [id]
            ) as CommentResult[];
            if (result.length > 0) {
                const comments: Comment[] = result.map(comment => {
                    const newComment: Comment = new Comment(comment.commentId, comment.userId, comment.messageId, comment.content);
                    newComment.rating = comment.rating;
                    newComment.createdAt = comment.createdAt;
                    return newComment;
                });
                return comments;
            }
            return [];
        }
        catch (reason) {
            console.error("An error occurred while searching for comments.", reason);
            return [];
        }
    }

    public static async getCommentById(id: number): Promise<Comment | undefined> {
        try {
            const result: CommentResult[] = await api.queryDatabase("SELECT * FROM comment WHERE commentId = ?", [id]) as CommentResult[];
            if (result.length > 0) {
                const comment: Comment = new Comment(result[0].commentId, result[0].userId, result[0].messageId, result[0].content);
                return comment;
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("Error fetching comment", reason);
            return undefined;
        }
    }

    public async create(userId: number, messageId: number, content: string): Promise<boolean> {
        try {
            const result: CommentResult[] = await api.queryDatabase(
                "INSERT INTO comment (userId, messageId, content) VALUES (?, ?, ?)", userId, messageId, content
            ) as CommentResult[];

            console.log("Success", result);
            return true;
        }
        catch (reason) {
            console.error("An error occurred while creating a new database entry.", reason);
            return false;
        }
    }

    public static async delete(commentId: number): Promise<boolean> {
        try {
            const result: CommentResult[] = await api.queryDatabase(
                "DELETE FROM comment WHERE commentId = ?", commentId
            ) as CommentResult[];

            console.log("Comment deleted successfully", result);
            return true;
        }
        catch (reason) {
            console.error("An error occurred while destroying a database entry.", reason);
            return false;
        }
    }

    public static async countTotalComments(): Promise<number | undefined> {
        try {
            const result: CommentResult[] = await api.queryDatabase("SELECT COUNT(*) as count FROM comment") as CommentResult[];
            if (result.length > 0) {
                return result[0].count;
            }
            else {
                console.error("No results found");
                return undefined;
            }
        }
        catch (reason) {
            console.error("Error fetching result", reason);
            return undefined;
        }
    }

    public static async countTotalCommentsByUserId(userId: number): Promise<number | undefined> {
        try {
            const result: CommentResult[] = await api.queryDatabase("SELECT COUNT(*) as count FROM comment WHERE userId = ?", [userId]) as CommentResult[];
            if (result.length > 0) {
                return result[0].count;
            }
            else {
                console.error("No results found");
                return undefined;
            }
        }
        catch (reason) {
            console.error("Error fetching result", reason);
            return undefined;
        }
    }

    public static async countTotalRatingByUserId(userId: number): Promise<number | undefined> {
        try {
            const result: CommentResult[] = await api.queryDatabase("SELECT SUM(rating) as count FROM comment WHERE userId = ?", [userId]) as CommentResult[];
            if (result.length > 0) {
                return result[0].count;
            }
            else {
                console.error("No results found");
                return undefined;
            }
        }
        catch (reason) {
            console.error("Error fetching result", reason);
            return undefined;
        }
    }

    public async updateRating(commentId: number, rating: number): Promise<boolean> {
        try {
            const result: CommentResult[] = await api.queryDatabase(
                "UPDATE comment SET rating = ? WHERE commentId = ?",
                rating, commentId
            ) as CommentResult[];
            console.log("Rating updated successfully:", result);
            return true;
        }
        catch (reason) {
            console.error("There has been an error updating the rating", reason);
            return false;
        }
    }

    // getters and setters:
    public get commentId(): number {
        return this._commentId;
    }

    public get userId(): number {
        return this._userId;
    }

    public get messageId(): number {
        return this._messageId;
    }

    public get content(): string {
        return this._content;
    }

    public get rating(): number | undefined {
        return this._rating;
    }

    public get createdAt(): string | undefined {
        return this._createdAt;
    }

    public set content(newContent: string) {
        this._content = newContent;
    }

    public set rating(newRating: number | undefined) {
        this._rating = newRating;
    }

    public set createdAt(newcreatedAt: string | undefined) {
        this._createdAt = newcreatedAt;
    }
}
