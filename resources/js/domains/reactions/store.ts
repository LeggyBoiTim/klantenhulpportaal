import { storeModuleFactory } from '../../services/store';
import { onMounted } from 'vue';

const reactionStore = storeModuleFactory('reactions');

reactionStore.actions.getAll();

// getters
export const getReactions = reactionStore.getters.all;
export const getReactionById = (id) => reactionStore.getters.getById(id);

// actions
export const createReaction = async (newReaction) => {
    await reactionStore.actions.create(newReaction);
};

export const updateReaction = async (id, updatedReaction) => {
    await reactionStore.actions.update(id, updatedReaction);
};

export const deleteReaction = async (id) => {
    await reactionStore.actions.delete(id);
};