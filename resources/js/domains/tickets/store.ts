import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';

export enum Status {
    Open = "open",
    InProgress = "in_progress",
    Closed = "closed"
}

export interface Ticket extends Item {
    assigned_id: number;
    category_id: number;
    user_id: number;
    title: string;
    content: string;
    status: Status;
    created_at: Date;
    updated_at: Date;
}

const ticketStore = storeModuleFactory<Ticket>('tickets');

ticketStore.actions.getAll();

// getters
export const getTickets = ticketStore.getters.all;
export const getTicketById = (id: number) => ticketStore.getters.byId(id);

// actions
export const createTicket = async (newTicket: Ticket) => {
    await ticketStore.actions.create(newTicket);
};

export const updateTicket = async (id: number, updatedTicket: Ticket) => {
    await ticketStore.actions.update(id, updatedTicket);
};

export const deleteTicket = async (id: number) => {
    await ticketStore.actions.delete(id);
};