import { computed, ref, Ref } from 'vue';
import { deleteRequest, getRequest, postRequest, putRequest } from '../http';

export type State<T extends {id: number}> = Ref<{[id: number]: Readonly<T>}>;
export type New<T extends {id: number}> = Omit<T, 'id'>;
export type Updatable<T extends {id: number}> = New<T> & {id?: number;};

export const storeModuleFactory = <T extends {id: number}>(moduleName: string) => {
    const state: State<T> = ref({});

    const getters = {
        all: computed(() => Object.values(state.value)),
        byId: (id: number) => computed(() => state.value[id])
    };

    const setters = {
        setAll: (items: T[]) => {
            for (const item of items) state.value[item.id] = Object.freeze(item);
        },
        setById: (item: T) => {
            state.value[item.id] = Object.freeze(item);
        },
        deleteById: (id: number) => {
            delete state.value[id];
        }
    };

    const actions = {
        getAll: async () => {
            const { data } = await getRequest(moduleName);
            if (!data) return;
            setters.setAll(data);
        },
        getById: async (id: number) => {
            const { data } = await getRequest(`${moduleName}/${id}`);
            if (!data) return;
            setters.setById(data);
        },
        create: async (item: New<T>) => {
            const { data } = await postRequest(moduleName, item);
            if (!data) return;
            setters.setById(data);
        },
        update: async (id: number, item: Updatable<T>) => {
            const { data } = await putRequest(`${moduleName}/${id}`, item);
            if (!data) return;
            setters.setById(data);
        },
        delete: async (id: number) => {
            await deleteRequest(`${moduleName}/${id}`);
            setters.deleteById(id);
        }
    };

    return { getters, setters, actions };
};