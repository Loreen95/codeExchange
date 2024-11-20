import { Post } from "../models/Post";
const postModel: Post = new Post(0, 0, "", "", 0, "");

await postModel.getAllPosts();

console.log("Hark Hark!");
