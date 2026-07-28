import { deleteRequest, getRequest, postRequest } from '../../services/http';
import { ref, computed } from 'vue';

const user = ref(null);

// getters
export const currentUser = computed(() => user.value);
export const isCurrentUser = (id: number) => computed(() => user.value.id === id);
export const isCurrentUserAdmin = computed (() => user.value.role === 'admin');

// actions
export const me = async () => {
    const { data } = await getRequest('user');
    if (!data) return;
    user.value = data;
};

export const createAuth = async (login: unknown) => {
    const { data } = await postRequest('auth', login);
    if (!data) return;
    user.value = data.user;
};

export const deleteAuth = async () => {
    await deleteRequest('auth');
    user.value = null;
};