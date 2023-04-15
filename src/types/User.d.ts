export interface IUser {
    nickname: string;
    email: string;
    password: string;
    state: UserStates;
    role: UserRoles;
}

export type UserStates = 'DELETED' | 'ACTIVE';

export type UserRoles = 'USER' | 'ADMIN' | 'OWNER';