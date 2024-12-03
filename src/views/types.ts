export type userResult = {
    userId: number;
    username: string;
    email: string;
    password: string;
    expertise: string;
    dob: Date;
    yearsExperience: number;
    createdAt: Date;
};

export type postResult = {
    postId: number;
    authorId: number;
    title: string;
    content: string;
    rating: number;
    createdAt: string;
};

export type commentResult = {
    commentId: number;
    userId: number;
    messageId: number;
    title: string;
    content: string;
    rating: number;
    createdAt: string;
};

export interface UserInfo {
    userId: number;
    userEmail: string;
    userName: string;
    dob: string;
    expertise: string | undefined;
    experience: number;
    stringedTimeAndDate: string;
}
