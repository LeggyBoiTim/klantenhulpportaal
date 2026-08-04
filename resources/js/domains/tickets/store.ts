import { storeModuleFactory } from '../../services/store';
import { Item } from '../../types';
import { Note } from '../notes/store';
import { Reaction } from '../reactions/store';

export enum Status {
    Open = "open",
    InProgress = "in_progress",
    Closed = "closed"
}

export interface Ticket extends Item {
    assigned_id: number | null;
    category_id: number;
    user_id: number;
    title: string;
    content: string;
    status: Status;
    created_at: Date;
    updated_at: Date;
    reactions: Reaction[];
    notes: Note[];
    assigned: string;
    category: string;
    user: string;
}

const ticketStore = storeModuleFactory<Ticket>('tickets');

// getters
export const getTickets = ticketStore.getters.all;
export const getTicketById = (id: number) => ticketStore.getters.byId(id);

// actions
export const fetchAllTickets = async () => {
    await ticketStore.actions.getAll();
}

export const fetchTicket = async (id: number) => {
    await ticketStore.actions.getById(id);
}

export const createTicket = async (newTicket: Ticket) => {
    await ticketStore.actions.create(newTicket);
};

export const updateTicket = async (id: number, updatedTicket: Ticket) => {
    await ticketStore.actions.update(id, updatedTicket);
};

export const deleteTicket = async (id: number) => {
    await ticketStore.actions.delete(id);
};

// helpers
export const formatStatus = (status: Status) => {
    return status === Status.Open ? "In afwachting" : status === Status.InProgress ? "In behandeling" : "Afgehandeld";
};