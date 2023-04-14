export interface IUser {
    nickname: string;
    email: string;
    password: string;
    state: UserStates;
}

export type UserStates = 'DELETED' | 'AVAILABLE';