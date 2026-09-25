import { deleteRequest, getRequest, postRequest } from '../../services/http';
import { ref, computed } from 'vue';
import { User } from '../users/store';

const auth = ref<User>();

// getters
export const currentUser = computed(() => auth.value);
export const isCurrentUser = (id: number) => computed(() => auth.value?.id === id);
export const isCurrentUserAdmin = computed(() => auth.value?.role === 'admin');

// actions
export const me = async () => {
    const { data } = await getRequest('user');
    if (!data) return;
    auth.value = data;
};

export const createAuth = async (login: unknown) => {
    const { data } = await postRequest('auth', login);
    if (!data) return;
    auth.value = data.user;
};

export const deleteAuth = async () => {
    await deleteRequest('auth');
    auth.value = undefined;
};