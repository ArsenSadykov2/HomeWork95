export interface User {
    _id: string;
    username: string;
    email?: string;
    token: string;
    role: string;
    displayName: string;
    avatar: File | null;
}

export interface RegisterMutation {
    username: string;
    email: string;
    password: string;
    displayName: string;
    avatar: File | null;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            message: string;
            name: string;
        },
        messages: string;
        name: string;
        _message: string;
    }
}


export interface GlobalError {
    error: string;
}