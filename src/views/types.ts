export type userResult = {
    userId: number;
    username: string;
    email: string;
    password: string;
};

export type postResult = {
    postId: number;
    authorId: number;
    title: string;
    content: string;
    rating: number;
    date: string;
};

export type commentResult = {
    commentId: number;
    userId: number;
    messageId: number;
    title: string;
    content: string;
    rating: number;
    date: string;
};
