export interface UserFields {
    username: string;
    displayName: string;
    email: string;
    avatar?: string | null;
    password: string;
    token: string;
    role: string;
    googleId?: string;
}
