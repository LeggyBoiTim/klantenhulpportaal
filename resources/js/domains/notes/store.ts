import { storeModuleFactory } from '../../services/store';

const noteStore = storeModuleFactory('notes');

noteStore.actions.getAll();

// getters
export const getNotes = noteStore.getters.all;
export const getNoteById = (id) => noteStore.getters.byId(id);

// actions
export const createNote = async (newNote) => {
    await noteStore.actions.create(newNote);
};

export const updateNote = async (id, updatedNote) => {
    await noteStore.actions.update(id, updatedNote);
};

export const deleteNote = async (id) => {
    await noteStore.actions.delete(id);
};