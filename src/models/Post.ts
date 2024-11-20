import "../hicConfig";
import { api } from "@hboictcloud/api";
import { postResult } from "../views/types";

class Post {
    private _postId: number;
    private _authorId: number;
    private _title: string;
    private _content: string;
    private _rating: number;
    private _date: string;

    // constructor:
    public constructor(id: number, authorId: number, title: string, content: string, rating: number, date: string) {
        this._postId = id;
        this._authorId = authorId;
        this._title = title;
        this._content = content;
        this._rating = rating;
        this._date = date;
    }

    // CRUD methods:
    public async getAllPosts(): Promise<Post[] | undefined> {
        try {
            const result: postResult[] = await api.queryDatabase("Select * from post") as postResult[];
            if (result.length > 0) {
                return result.map(post => new Post(post.postId, post.authorId, post.title, post.content, post.rating, post.date));
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

    public async getPostById(id: number): Promise<Post | undefined> {
        try {
            const result: postResult[] = await api.queryDatabase("SELECT * from post WHERE postID = ?", [id]) as postResult[];
            if (result.length > 0) {
                return new Post(result[0].postId, result[0].authorId, result[0].title, result[0].content, result[0].rating, result[0].date);
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

const postmodel: Post = new Post(0, 0, "", "", 0, "");
const listOfPosts: Promise<Post[] | undefined> = postmodel.getAllPosts();
console.log(listOfPosts);
