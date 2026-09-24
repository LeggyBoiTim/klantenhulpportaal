<template>
    <div v-if="ticket">
        <div>
            <h1><b>Details Ticket</b></h1><br>
            <h2><b>Titel:</b> {{ ticket.title }}</h2><br>
            <p><b>Gebruiker:</b> {{ ticket.user_name }}</p><br>
            <p><b>Beschrijving:</b><br>{{ ticket.content }}</p><br>
            <p><b>Categorie:</b> {{ ticket.category_name }}</p><br>
            <p><b>Status:</b> {{ formatStatus(ticket.status) }}</p><br>
            <p><b>Toegewezen aan:</b> {{ ticket.assigned_name ? ticket.assigned_name : 'Nog niet toegewezen' }}</p><br>
            <p><b>Laatst gewijzigd:</b> {{ formatDate(ticket.updated_at) }}</p><br>
        </div>
        <div>
            <p @click="sortReactionsBy('created_at')" style="cursor: pointer;"><b>Reacties {{ getReactionsSortIcon('created_at') }}</b></p>
            <div v-if="isCurrentUserAdmin">
                <CreateReactionForm :reaction="newReaction" @submit="handleCreateReaction" /><br>
            </div>
            <div v-if="!ticket.reactions.length">
                <p>Er zijn nog geen reacties geplaatst.</p><br>
            </div>
            <div v-for="reaction in sortedReactions" :key="reaction.id">
                <div v-if="editing !== reaction.id">
                    <p><i>{{ reaction.user_name }} op {{ formatDate(reaction.created_at) }}:</i></p>
                    <p>{{ reaction.content }}</p>
                    <button v-if="isCurrentUserAdmin" @click="changeEditing(reaction.id)" style="cursor: pointer;">Bewerk</button>&nbsp;&nbsp;
                    <button @click="handleDeleteReaction(reaction.id)" style="cursor: pointer;">Verwijder</button>
                </div>
                <div v-else>
                    <EditReactionForm :reaction="<Updatable<Reaction>>reaction" @submit="handleUpdateReaction" @cancel="changeEditing(0)"/>
                </div>
                <br>
            </div>
        </div>
        <div style="color: maroon;">
            <p @click="sortNotesBy('created_at')" style="cursor: pointer;"><b>Notities {{ getNotesSortIcon('created_at') }}</b></p>
            <div v-if="isCurrentUserAdmin">
                <CreateNoteForm :note="newNote" @submit="handleCreateNote" /><br>
            </div>
            <div v-if="!ticket.notes.length">
                <p>Er zijn nog geen notities geplaatst.</p><br>
            </div>
            <div v-for="note in sortedNotes" :key="note.id">
                <div v-if="editing !== note.id">
                    <p><i>{{ formatDate(note.created_at) }}:</i></p>
                    <p>{{ note.content }}</p>
                    <button v-if="isCurrentUserAdmin" @click="changeEditing(note.id)" style="cursor: pointer;">Bewerk</button>&nbsp;&nbsp;
                    <button @click="handleDeleteNote(note.id)" style="cursor: pointer;">Verwijder</button>
                </div>
                <div v-else>
                    <EditNoteForm :note="<Updatable<Note>>note" @submit="handleUpdateNote" @cancel="changeEditing(0)"/>
                </div>
                <br>
            </div>
        </div>
        <div>
            <p><b>Acties:</b></p>
            <RouterLink :to="{ name: 'tickets.edit', params: { id: ticket.id } }">Bewerk</RouterLink>&nbsp;&nbsp;
            <span v-if="isCurrentUserAdmin"><RouterLink :to="{ name: 'tickets.edit-assigned', params: { id: ticket.id } }">Wijs administrator toe</RouterLink>&nbsp;&nbsp;</span>
            <span v-if="isCurrentUserAdmin"><RouterLink :to="{ name: 'tickets.edit-status', params: { id: ticket.id } }">Wijzig status</RouterLink>&nbsp;&nbsp;</span>
            <button @click="handleDeleteTicket" style="cursor: pointer;">Verwijder</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { deleteTicket, fetchTicket, formatStatus, getTicketById } from '../store';
import { formatDate } from '../../../services/helpers/date';
import { currentUser, isCurrentUserAdmin } from '../../auth/store';
import { computed, ref } from 'vue';
import { New, Updatable } from '../../../services/store';
import { createReaction, deleteReaction, Reaction, updateReaction } from '../../reactions/store';
import CreateReactionForm from '../../reactions/components/CreateForm.vue';
import EditReactionForm from '../../reactions/components/EditForm.vue';
import { createNote, deleteNote, Note, updateNote } from '../../notes/store';
import CreateNoteForm from '../../notes/components/CreateForm.vue';
import EditNoteForm from '../../notes/components/EditForm.vue';
import { sortTable } from '../../../services/helpers/table';

const route = useRoute();
const router = useRouter();
const ticket = getTicketById(Number(route.params.id));
const ticketReactions = computed(() => ticket.value.reactions)
const ticketNotes = computed(() => ticket.value.notes);
const editing = ref(0);

fetchTicket(Number(route.params.id));

const newReaction = ref<New<Reaction>>({
    ticket_id: Number(route.params.id),
    user_id: currentUser.value?.id,
    content: '',
    user_name: '',
    created_at: new Date
});

const newNote = ref<New<Note>>({
    ticket_id: Number(route.params.id),
    user_id: currentUser.value?.id, // <--- This needs to become the ticket's user's id instead of the current user's id.
    content: '',
    created_at: new Date
});

const { sortedItems: sortedReactions, sortBy: sortReactionsBy, getSortIcon: getReactionsSortIcon } = sortTable<Reaction>(
    ticketReactions,
    'created_at',
    'asc'
);

const { sortedItems: sortedNotes, sortBy: sortNotesBy, getSortIcon: getNotesSortIcon } = sortTable<Note>(
    ticketNotes,
    'created_at',
    'asc'
);

const handleDeleteTicket = async () => {
    const confirmation = confirm('Weet je zeker dat je deze ticket wilt verwijderen?');
    if (!confirmation) return;
    await deleteTicket(ticket.value.id);
    router.push({ name: 'tickets.overview' });
}

const handleCreateReaction = async (data: Reaction) => {
    await createReaction(data);
    await fetchTicket(ticket.value.id);
}

const handleUpdateReaction = async (data: Reaction) => {
    await updateReaction(data.id, data);
    await fetchTicket(ticket.value.id);
    editing.value = 0;
}

const handleDeleteReaction = async (id: number) => {
    const confirmation = confirm('Weet je zeker dat je deze reactie wilt verwijderen?');
    if (!confirmation) return;
    await deleteReaction(id);
    await fetchTicket(ticket.value.id);
}

const handleCreateNote = async (data: Note) => {
    await createNote(data);
    await fetchTicket(ticket.value.id);
}

const handleUpdateNote = async (data: Note) => {
    await updateNote(data.id, data);
    await fetchTicket(ticket.value.id);
    editing.value = 0;
}

const handleDeleteNote = async (id: number) => {
    const confirmation = confirm('Weet je zeker dat je deze notitie wilt verwijderen?');
    if (!confirmation) return;
    await deleteNote(id);
    await fetchTicket(ticket.value.id);
}

const changeEditing = (id: number) => {
    editing.value = id;
}
</script>