export type UserResult = {
    userId: number;
    username: string;
    email: string;
    password: string;
    expertise: string;
    dob: Date;
    bio: string;
    yearsExperience: string;
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
    total_rows: number;
    updatedAt: string;
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
    updatedAt: string;
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
    yearsExperience: string;
    expertise: string;
    stringedTimeAndDate: string;
    bio: string;
    foto: string;
    yearsExperienceDisplay: string;
}

export interface PostInfo {
    postId: number;
    postTitle: string;
    postContent: string;
}
