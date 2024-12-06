import { PostController } from "../controllers/PostController";
const post: PostController = new PostController();
const insertPostsHere: HTMLElement | null = document.querySelector(".posts");

if (insertPostsHere) {
    const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
    const userId: string | null = userUrl.get("user");
    await post.renderPosts("userSpecific", Number(userId));
}
