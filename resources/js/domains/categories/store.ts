import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';

export interface Category extends Item {
    name: string;
}

const categoryStore = storeModuleFactory<Category>('categories');

categoryStore.actions.getAll();

// getters
export const getCategories = categoryStore.getters.all;
export const getCategoryById = (id: number) => categoryStore.getters.byId(id);

// actions
export const createCategory = async (newCategory: Category) => {
    await categoryStore.actions.create(newCategory);
};

export const updateCategory = async (id: number, updatedCategory: Category) => {
    await categoryStore.actions.update(id, updatedCategory);
};

export const deleteCategory = async (id: number) => {
    await categoryStore.actions.delete(id);
};