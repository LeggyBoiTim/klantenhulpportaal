import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';

export enum Role {
    User = "user",
    Admin = "admin"
}

export interface User extends Item {
    name: string;
    email: string;
    role: Role;
}

const userStore = storeModuleFactory<User>('users');

// getters
export const getUsers = userStore.getters.all;
export const getUserById = (id: number) => userStore.getters.byId(id);

// actions
export const fetchUsers = async () => {
    await userStore.actions.getAll();
}

export const createUser = async (newUser: User) => {
    await userStore.actions.create(newUser);
};

export const updateUser = async (id: number, updatedUser: User) => {
    await userStore.actions.update(id, updatedUser);
};

export const deleteUser = async (id: number) => {
    await userStore.actions.delete(id);
};