export type UserResult = {
    userId: number;
    username: string;
    email: string;
    password: string;
    expertise: string;
    dob: Date;
    bio: string;
    yearsExperience: number;
    createdAt: Date;
    count: number;
    foto: string;
};

export type PostResult = {
    postId: number;
    authorId: number;
    title: string;
    content: string;
    rating: number;
    createdAt: string;
    count: number;
    insertId: number;
};

export type CommentResult = {
    commentId: number;
    userId: number;
    messageId: number;
    title: string;
    content: string;
    rating: number;
    createdAt: string;
    count: number;
};

export type RatingCommentResult = {
    ratingId: number;
    userId: number;
    commentId: number;
    ratingType: string;
};

export type RatingPostResult = {
    ratingId: number;
    userId: number;
    postId: number;
    ratingType: string;
    count: number;
};

export interface UserInfo {
    userId: number;
    userEmail: string;
    userName: string;
    dob: Date | string | null;
    yearsExperience: number;
    expertise: string;
    stringedTimeAndDate: string;
    bio: string;
    foto: string;
}

export interface PostInfo {
    postId: number;
    title: string;
    content: string;
}
