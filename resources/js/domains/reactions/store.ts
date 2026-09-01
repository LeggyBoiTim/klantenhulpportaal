import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';

export interface Reaction extends Item {
    ticket_id: number;
    user_id: number;
    content: string;
    ticket_title: string;
    user_name: string;
}

const reactionStore = storeModuleFactory<Reaction>('reactions');

// getters
export const getReactions = reactionStore.getters.all;
export const getReactionById = (id: number) => reactionStore.getters.byId(id);

// actions
export const fetchAllReactions = async () => {
    await reactionStore.actions.getAll();
}

export const fetchReaction = async (id: number) => {
    await reactionStore.actions.getById(id);
}

export const createReaction = async (newReaction: Reaction) => {
    await reactionStore.actions.create(newReaction);
};

export const updateReaction = async (id: number, updatedReaction: Reaction) => {
    await reactionStore.actions.update(id, updatedReaction);
};

export const deleteReaction = async (id: number) => {
    await reactionStore.actions.delete(id);
};