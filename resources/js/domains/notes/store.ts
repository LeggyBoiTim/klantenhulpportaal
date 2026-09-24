import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';

export interface Note extends Item {
    ticket_id: number;
    user_id: number;
    content: string;
    created_at: Date;
}

export const noteStore = storeModuleFactory<Note>('notes');

// getters
export const getNotes = noteStore.getters.all;
export const getNoteById = (id: number) => noteStore.getters.byId(id);

// actions
export const fetchAllNotes = async () => {
    await noteStore.actions.getAll();
}

export const fetchNote = async (id: number) => {
    await noteStore.actions.getById(id);
}

export const createNote = async (newNote: Note) => {
    await noteStore.actions.create(newNote);
};

export const updateNote = async (id: number, updatedNote: Note) => {
    await noteStore.actions.update(id, updatedNote);
};

export const deleteNote = async (id: number) => {
    await noteStore.actions.delete(id);
};