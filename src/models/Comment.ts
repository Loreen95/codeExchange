import "../hicConfig";
import { api } from "@hboictcloud/api";
import { commentResult } from "../views/types";

export class Comment {
    private _commentId: number = 0;
    private _userId: number;
    private _messageId: number;
    private _title: string;
    private _content: string;
    private _rating: number;
    private _createdAt: string;

    // constructor:
    public constructor(commentId: number, userId: number, messageId: number, title: string, content: string, rating: number, createdAt: string) {
        this._commentId = commentId;
        this._userId = userId;
        this._messageId = messageId;
        this._title = title;
        this._content = content;
        this._rating = rating;
        this._createdAt = createdAt;
    }

    // CRUD methods:
    public async getCommentsByMessageId(id: number): Promise<Comment[]> {
        try {
            const result: commentResult[] = await api.queryDatabase(
                "SELECT * FROM comment WHERE messageId = ?",
                [id]
            ) as commentResult[];

            // Controleer of er resultaten zijn
            if (result.length > 0) {
                // Map de resultaten naar een lijst van Comment-objecten
                return result.map(row =>
                    new Comment(row.commentId, row.userId, row.messageId, row.title, row.content, row.rating, row.createdAt)
                );
            }

            // Als er geen resultaten zijn, retourneer een lege array
            return [];
        }
        catch (reason) {
            console.error("An error occurred while searching for comments.", reason);
            return [];
        }
    }

    public async create(userId: number, messageId: number, title: string, content: string, rating: number, createdAt: string): Promise<boolean> {
        try {
            const result: commentResult[] = await api.queryDatabase(
                "INSERT INTO comment (userId, messageId, title, content, rating, createdAt) VALUES (?, ?, ?, ?, ?, ?)", userId, messageId, title, content, rating, createdAt
            ) as commentResult[];

            console.log("Success", result);
            return true;
        }
        catch (reason) {
            console.error("An error occurred while creating a new database entry.", reason);
            return false;
        }
    }

    // getters and setters:
    public getCommentId(): number {
        return this._commentId;
    }

    public getUserId(): number {
        return this._userId;
    }

    public getMessageId(): number {
        return this._messageId;
    }

    public getTitle(): string {
        return this._title;
    }

    public getContent(): string {
        return this._content;
    }

    public getRating(): number {
        return this._rating;
    }

    public getcreatedAt(): string {
        return this._createdAt;
    }

    public setTitle(newTitle: string): void {
        this._title = newTitle;
    }

    public setContent(newContent: string): void {
        this._content = newContent;
    }

    public setRating(newRating: number): void {
        this._rating = newRating;
    }

    public setcreatedAt(newcreatedAt: string): void {
        this._createdAt = newcreatedAt;
    }
}
