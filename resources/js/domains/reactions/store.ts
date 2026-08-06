import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';

export interface Reaction extends Item {
    ticket_id: number;
    user_id: number;
    content: string;
    ticket: string;
    user: string;
}

const reactionStore = storeModuleFactory<Reaction>('reactions');

reactionStore.actions.getAll();

// getters
export const getReactions = reactionStore.getters.all;
export const getReactionById = (id: number) => reactionStore.getters.byId(id);

// actions
export const createReaction = async (newReaction: Reaction) => {
    await reactionStore.actions.create(newReaction);
};

export const updateReaction = async (id: number, updatedReaction: Reaction) => {
    await reactionStore.actions.update(id, updatedReaction);
};

export const deleteReaction = async (id: number) => {
    await reactionStore.actions.delete(id);
};