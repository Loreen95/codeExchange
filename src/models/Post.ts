import "../hicConfig";
import { api } from "@hboictcloud/api";
import { PostResult } from "../views/types";

export class Post {
    private _postId: number;
    private _authorId: number;
    private _title: string;
    private _content: string;
    private _rating: number | undefined;
    private _createdAt: string | undefined;

    // constructor:
    public constructor(postId: number, authorId: number, title: string, content: string) {
        this._postId = postId;
        this._authorId = authorId;
        this._title = title;
        this._content = content;
    }

    // CRUD methods:
    public static async getAllPosts(): Promise<Post[] | undefined> {
        try {
            const result: PostResult[] = await api.queryDatabase("Select * from post ORDER BY createdAt DESC") as PostResult[];
            if (result.length > 0) {
                const posts: Post[] = result.map(post => {
                    const newPost: Post = new Post(post.postId, post.authorId, post.title, post.content);
                    newPost.rating = post.rating;
                    newPost.createdAt = post.createdAt;
                    return newPost;
                });
                return posts;
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

    public static async getAllPostsByUserId(id: number): Promise<Post[] | undefined> {
        try {
            const result: PostResult[] = await api.queryDatabase("SELECT * FROM `post` WHERE authorId = ? ORDER BY createdAt DESC", [id]) as PostResult[];
            if (result.length > 0) {
                const posts: Post[] = result.map(post => {
                    const newPost: Post = new Post(post.postId, post.authorId, post.title, post.content);
                    newPost.rating = post.rating;
                    newPost.createdAt = post.createdAt;
                    return newPost;
                });
                return posts;
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

    public static async getAllPostsByWordInContent(searchTerm: string): Promise<Post[] | undefined> {
        try {
            searchTerm = "%" + searchTerm + "%";
            console.log(searchTerm);
            const result: PostResult[] = await api.queryDatabase("SELECT * FROM post WHERE content LIKE ? ORDER BY createdAt DESC", searchTerm) as PostResult[];
            if (result.length > 0) {
                const posts: Post[] = result.map(post => {
                    const newPost: Post = new Post(post.postId, post.authorId, post.title, post.content);
                    newPost.rating = post.rating;
                    newPost.createdAt = post.createdAt;
                    return newPost;
                });
                return posts;
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while gathering all posts by search term.", reason);
            return undefined;
        }
    }

    public static async getAllPostsByWordInUserExpertise(searchTerm: string): Promise<Post[] | undefined> {
        try {
            searchTerm = "%" + searchTerm + "%";
            console.log(searchTerm);
            const result: PostResult[] = await api.queryDatabase("SELECT post.* FROM `post` INNER JOIN `user` ON post.authorId = user.userId WHERE user.expertise LIKE ?", searchTerm) as PostResult[];
            if (result.length > 0) {
                const posts: Post[] = result.map(post => {
                    const newPost: Post = new Post(post.postId, post.authorId, post.title, post.content);
                    newPost.rating = post.rating;
                    newPost.createdAt = post.createdAt;
                    return newPost;
                });
                return posts;
            }
            else {
                return undefined;
            }
        }
        catch (reason) {
            console.error("An error occurred while gathering all posts by search term.", reason);
            return undefined;
        }
    }

    public static async getPostById(id: number): Promise<Post | undefined> {
        try {
            const result: PostResult[] = await api.queryDatabase("SELECT * from post WHERE postId = ?", [id]) as PostResult[];
            if (result.length > 0) {
                const post: Post = new Post(result[0].postId, result[0].authorId, result[0].title, result[0].content);
                post.rating = result[0].rating;
                post.createdAt = result[0].createdAt;
                return post;
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

    public async create(authorId: number, title: string, content: string): Promise<Post | undefined> {
        try {
            const result: { insertId: number } = await api.queryDatabase(
                "INSERT INTO post (authorID, title, content) VALUES (?, ?, ?)",
                authorId, title, content
            ) as { insertId: number };
            if (result.insertId) {
                console.log("Post created with postId:", result.insertId);

                return await Post.getPostById(result.insertId);
            }
            return undefined;
        }
        catch (reason) {
            console.error("An error occurred while creating a new database entry.", reason);
            return undefined;
        }
    }

    public static async countTotalPosts(): Promise<number | undefined> {
        try {
            const result: PostResult[] = await api.queryDatabase("SELECT COUNT(*) as count FROM post") as PostResult[];
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

    public static async countTotalPostsByUserId(authorId: number): Promise<number | undefined> {
        try {
            const result: PostResult[] = await api.queryDatabase("SELECT COUNT(*) as count FROM post WHERE authorId = ?", [authorId]) as PostResult[];
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

    public async updateRating(postId: number, rating: number): Promise<boolean> {
        try {
            const result: PostResult[] = await api.queryDatabase(
                "UPDATE post SET rating = ? WHERE postId = ?",
                rating, postId
            ) as PostResult[];
            console.log("Rating updated successfully:", result);
            return true;
        }
        catch (reason) {
            console.error("There has been an error updating the rating", reason);
            return false;
        }
    }

    public get postId(): number {
        return this._postId;
    }

    public get authorId(): number {
        return this._authorId;
    }

    public get title(): string {
        return this._title;
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

    public set title(newTitle: string) {
        this._title = newTitle;
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
