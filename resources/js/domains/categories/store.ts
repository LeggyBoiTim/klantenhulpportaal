import { storeModuleFactory } from '../../services/store';

const categoryStore = storeModuleFactory('categories');

categoryStore.actions.getAll();

// getters
export const getCategories = categoryStore.getters.all;
export const getCategoryById = (id) => categoryStore.getters.getById(id);

// actions
export const createCategory = async (newCategory) => {
    await categoryStore.actions.create(newCategory);
};

export const updateCategory = async (id, updatedCategory) => {
    await categoryStore.actions.update(id, updatedCategory);
};

export const deleteCategory = async (id) => {
    await categoryStore.actions.delete(id);
};