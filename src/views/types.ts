export type userResult = {
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
};

export type postResult = {
    postId: number;
    authorId: number;
    title: string;
    content: string;
    rating: number;
    createdAt: string;
    count: number;
    insertId: number;
};

export type commentResult = {
    commentId: number;
    userId: number;
    messageId: number;
    title: string;
    content: string;
    rating: number;
    createdAt: string;
    count: number;
};

export interface UserInfo {
    userId: number;
    userEmail: string;
    userName: string;
    dob: Date | string | null;
    experience: number;
    stringedTimeAndDate: string;
    bio: string;
}

export interface PostInfo {
    postId: number;
    title: string;
    content: string;
}
