import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';

export interface Category extends Item {
    name: string;
}

const categoryStore = storeModuleFactory<Category>('categories');

// getters
export const getCategories = categoryStore.getters.all;
export const getCategoryById = (id: number) => categoryStore.getters.byId(id);

// actions
export const fetchAllCategories = async () => {
    await categoryStore.actions.getAll();
}

export const fetchCategory = async (id: number) => {
    await categoryStore.actions.getById(id);
}

export const createCategory = async (newCategory: Category) => {
    await categoryStore.actions.create(newCategory);
};

export const updateCategory = async (id: number, updatedCategory: Category) => {
    await categoryStore.actions.update(id, updatedCategory);
};

export const deleteCategory = async (id: number) => {
    await categoryStore.actions.delete(id);
};