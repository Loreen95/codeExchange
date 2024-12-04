import "../hicConfig";
import { api } from "@hboictcloud/api";
import { postResult } from "../views/types";

export class Post {
    private _postId: number = 0;
    private _authorId: number;
    private _title: string;
    private _content: string;
    private _rating: number;
    private _createdAt: string;

    // constructor:
    public constructor(postId: number, authorId: number, title: string, content: string, rating: number, createdAt: string) {
        this._postId = postId;
        this._authorId = authorId;
        this._title = title;
        this._content = content;
        this._rating = rating;
        this._createdAt = createdAt;
    }

    // CRUD methods:
    public async getAllPosts(): Promise<Post[] | undefined> {
        try {
            const result: postResult[] = await api.queryDatabase("Select * from post ORDER BY createdAt DESC") as postResult[];
            if (result.length > 0) {
                return result.map(post => new Post(post.postId, post.authorId, post.title, post.content, post.rating, post.createdAt));
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while gathering all posts.", reason);
            return undefined;
        }
    }

    public async getAllPostsByUserId(id: number): Promise<Post[] | undefined> {
        try {
            const result: postResult[] = await api.queryDatabase("SELECT * FROM `post` WHERE authorId = ? ORDER BY createdAt DESC", [id]) as postResult[];
            if (result.length > 0) {
                return result.map(post => new Post(post.postId, post.authorId, post.title, post.content, post.rating, post.createdAt));
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while gathering all posts by user id.", reason);
            return undefined;
        }
    }

    public async getPostById(id: number): Promise<Post | undefined> {
        try {
            const result: postResult[] = await api.queryDatabase("SELECT * from post WHERE postId = ?", [id]) as postResult[];
            if (result.length > 0) {
                return new Post(result[0].postId, result[0].authorId, result[0].title, result[0].content, result[0].rating, result[0].createdAt);
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while searching for this post.", reason);
            return undefined;
        }
    }

    public async create(authorId: number, title: string, content: string, createdAt: string): Promise<boolean> {
        try {
            const result: postResult[] = await api.queryDatabase(
                "INSERT INTO post (authorID, title, content, createdAt) VALUES (?, ?, ?, ?)",
                authorId, title, content, createdAt
            ) as postResult[];

            console.log("Success", result);
            return true;
        }
        catch (reason) {
            console.error("An error occurred while creating a new database entry.", reason);
            return false;
        }
    }

    public async countTotalPosts(): Promise<number | undefined> {
        try {
            const result: postResult[] = await api.queryDatabase("SELECT COUNT(*) as count FROM post") as postResult[];
            if (result.length > 0) {
                return result[0].count;
            }
            else {
                console.error("Geen resultaten gevonden in de query.");
                return undefined;
            }
        }
        catch (reason) {
            console.error("Error fetching result", reason);
            return undefined;
        }
    }

    // getters and setters:
    public getPostId(): number {
        return this._postId;
    }

    public getAuthorId(): number {
        return this._authorId;
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
