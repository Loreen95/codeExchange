import { PostClass } from "../controllers/PostController";
const post: PostClass = new PostClass();

const insertPostsHere: HTMLDivElement = document.querySelector(".posts")!;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (insertPostsHere) {
    const userUrl: URLSearchParams = new URLSearchParams(window.location.search);
    await post.renderPosts("user spesific", Number(userUrl.get("user")));
}
