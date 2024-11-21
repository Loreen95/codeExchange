// import { Post } from "../models/Post";
// const postModel: Post = new Post(0, 0, "", "", 0, "");
import { PostClass } from "../controllers/PostController";
const post: PostClass = new PostClass();

await post.renderPosts();
