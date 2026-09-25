import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';

export enum Role {
    User = "user",
    Admin = "admin"
}

export interface User extends Item {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: Role;
}

const userStore = storeModuleFactory<User>('users');

// getters
export const getUsers = userStore.getters.all;
export const getUserById = (id: number) => userStore.getters.byId(id);

// actions
export const fetchAllUsers = async () => {
    await userStore.actions.getAll();
}

export const fetchUser = async (id: number) => {
    await userStore.actions.getById(id);
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

// helpers
export const formatRole = (role: Role) => {
    return role === Role.User ? "Gebruiker" : role === Role.Admin ? "Administrator" : "Geen rol.";
};