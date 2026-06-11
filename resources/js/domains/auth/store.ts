import { deleteRequest, getRequest, postRequest } from '../../services/http';
import { storeModuleFactory } from '../../services/store';
import { onMounted, ref } from 'vue';

const authStore = storeModuleFactory('auth');

authStore.actions.getAll();

// getters
export const getAuth = async () => {
    const { data } = await getRequest('auth');
    if (!data) return;
    authStore.setters.setAll([data]);
};

// actions
export const createAuth = async (newAuth) => {
    const { data } = await postRequest('auth', newAuth);
    if (!data) return;
    authStore.setters.setAll([data]);
};

export const deleteAuth = async () => {
    await deleteRequest('auth');
    authStore.setters.deleteByItem({ id: undefined });
};