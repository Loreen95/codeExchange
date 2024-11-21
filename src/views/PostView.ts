// import { Post } from "../models/Post";
// const postModel: Post = new Post(0, 0, "", "", 0, "");
import { PostClass } from "../controllers/PostController";
const post: PostClass = new PostClass();

const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertPostsHere) {
    await post.renderPosts();
}
