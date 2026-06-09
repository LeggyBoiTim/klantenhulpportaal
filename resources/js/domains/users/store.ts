import { storeModuleFactory } from '../../services/store';
import { onMounted } from 'vue';

const userStore = storeModuleFactory('users');

userStore.actions.getAll();

// getters
export const getUsers = userStore.getters.all;
export const getUserById = (id) => userStore.getters.getById(id);

// actions
export const createUser = async (newUser) => {
    await userStore.actions.create(newUser);
};

export const updateUser = async (id, updatedUser) => {
    await userStore.actions.update(id, updatedUser);
};

export const deleteUser = async (id) => {
    await userStore.actions.delete(id);
};