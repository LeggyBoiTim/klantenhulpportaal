<template>
    <div v-if="ticket">
        <h1><b>Details Ticket</b></h1><br>
        <h2><b>Titel:</b> {{ ticket.title }}</h2><br>
        <p><b>Gebruiker:</b> {{ ticket.user_name }}</p><br>
        <p><b>Beschrijving:</b><br>{{ ticket.content }}</p><br>
        <p><b>Categorie:</b> {{ ticket.category_name }}</p><br>
        <p><b>Status:</b> {{ formatStatus(ticket.status) }}</p><br>
        <p><b>Toegewezen aan:</b> {{ ticket.assigned_name ? ticket.assigned_name : 'Nog niet toegewezen' }}</p><br>
        <p><b>Laatst gewijzigd:</b> {{ formatDate(ticket.updated_at) }}</p><br>
        <p><b>Reacties:</b></p>
        <div v-if="isCurrentUserAdmin">
            <CreateForm :reaction="newReaction" @submit="handleCreateReaction" /><br>
        </div>
        <div v-if="!ticket.reactions.length">
            <p>Er zijn nog geen reacties geplaatst.</p><br>
        </div>
        <div v-for="reaction in ticket.reactions" :key="reaction.id">
            <div v-if="editing !== reaction.id">
                <p><i>{{ reaction.user_name }}:</i></p>
                <p>{{ reaction.content }}</p>
                <button @click="changeEditing(reaction.id)" style="cursor: pointer;">Bewerk</button>
            </div>
            <div v-else>
                <EditForm :reaction="<Updatable<Reaction>>reaction" @submit="handleUpdateReaction" @cancel="changeEditing(0)"/>
            </div>
            <br>
        </div>
        <p><b>Acties:</b></p>
        <RouterLink :to="{ name: 'tickets.edit', params: { id: ticket.id } }">Bewerk</RouterLink>&nbsp;&nbsp;
        <span v-if="isCurrentUserAdmin"><RouterLink :to="{ name: 'tickets.edit-assigned', params: { id: ticket.id } }">Wijs administrator toe</RouterLink>&nbsp;&nbsp;</span>
        <span v-if="isCurrentUserAdmin"><RouterLink :to="{ name: 'tickets.edit-status', params: { id: ticket.id } }">Wijzig status</RouterLink>&nbsp;&nbsp;</span>
        <button @click="handleDeleteTicket" style="cursor: pointer;">Verwijder</button>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { deleteTicket, fetchTicket, formatStatus, getTicketById } from '../store';
import { formatDate } from '../../../services/helpers/date';
import { currentUser, isCurrentUserAdmin } from '../../auth/store';
import { ref } from 'vue';
import { New, Updatable } from '../../../services/store';
import { createReaction, Reaction, updateReaction } from '../../reactions/store';
import CreateForm from '../../reactions/components/CreateForm.vue';
import EditForm from '../../reactions/components/EditForm.vue';

const route = useRoute();
const router = useRouter();
const ticket = getTicketById(Number(route.params.id));
const editing = ref(0);

fetchTicket(Number(route.params.id));

const newReaction = ref<New<Reaction>>({
    ticket_id: Number(route.params.id),
    user_id: currentUser.value?.id,
    content: '',
    user_name: '',
    ticket_title: ''
});

const handleDeleteTicket = async () => {
    const confirmation = confirm('Weet je zeker dat je deze ticket wilt verwijderen?');
    if (!confirmation) return;
    await deleteTicket(ticket.value.id);
    router.push({ name: 'tickets.overview' });
}

const handleCreateReaction = async (data: Reaction) => {
    await createReaction(data);
    await fetchTicket(data.ticket_id);
}

const handleUpdateReaction = async (data: Reaction) => {
    await updateReaction(data.id, data);
    await fetchTicket(data.ticket_id);
    editing.value = 0;
};

const changeEditing = (id: number) => {
    editing.value = id;
}
</script>