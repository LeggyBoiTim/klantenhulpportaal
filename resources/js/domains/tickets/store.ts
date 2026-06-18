import { storeModuleFactory } from '../../services/store';

const ticketStore = storeModuleFactory('tickets');

ticketStore.actions.getAll();

// getters
export const getTickets = ticketStore.getters.all;
export const getTicketById = (id) => ticketStore.getters.getById(id);

// actions
export const createTicket = async (newTicket) => {
    await ticketStore.actions.create(newTicket);
};

export const updateTicket = async (id, updatedTicket) => {
    await ticketStore.actions.update(id, updatedTicket);
};

export const deleteTicket = async (id) => {
    await ticketStore.actions.delete(id);
};