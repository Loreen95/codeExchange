import "../hicConfig";
import { api } from "@hboictcloud/api";
import { commentResult } from "../views/types";

export class Comment {
    private _commentId: number;
    private _userId: number;
    private _messageId: number;
    private _title: string;
    private _content: string;
    private _rating: number;
    private _date: string;

    // constructor:
    public constructor(commentId: number = 0, userId: number, messageId: number, title: string, content: string, rating: number, date: string) {
        this._commentId = commentId;
        this._userId = userId;
        this._messageId = messageId;
        this._title = title;
        this._content = content;
        this._rating = rating;
        this._date = date;
    }

    // CRUD methods:
    public async getCommentsByMessageId(id: number): Promise<Comment | undefined> {
        try {
            const result: commentResult[] = await api.queryDatabase("SELECT * from comment WHERE messageId = ?", [id]) as commentResult[];
            if (result.length > 0) {
                return new Comment(result[0].commentId, result[0].userId, result[0].messageId, result[0].title, result[0].content, result[0].rating, result[0].date);
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while searching for this comment.", reason);
            return undefined;
        }
    }

    public async create(userId: number, messageId: number, title: string, content: string, rating: number, date: string): Promise<boolean> {
        try {
            const result: commentResult[] = await api.queryDatabase(
                "INSERT INTO comment (userId, messageId, title, content, rating, date) VALUES (?, ?, ?, ?, ?, ?)", userId, messageId, title, content, rating, date
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

    public getDate(): string {
        return this._date;
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

    public setDate(newDate: string): void {
        this._date = newDate;
    }
}
