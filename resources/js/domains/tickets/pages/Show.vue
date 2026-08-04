<template>
    <h1><b>Details Ticket</b></h1><br>
    <h2><b>Titel:</b> {{ ticket.title }}</h2><br>
    <p><b>Beschrijving:</b><br>{{ ticket.content }}</p><br>
    <p><b>Categorie:</b> {{ ticket.category }}</p><br>
    <p><b>Status:</b> {{ formatStatus(ticket.status) }}</p><br>
    <p><b>Toegewezen aan:</b> {{ ticket.assigned ? ticket.assigned : 'Nog niet toegewezen' }}</p><br>
    <p><b>Laatst gewijzigd:</b> {{ formatDate(ticket.updated_at) }}</p><br>
    <p><b>Reacties:</b></p>
    <div v-if="!ticket.reactions.length">
        <p>Er zijn nog geen reacties geplaatst.</p><br>
    </div>
    <div v-for="reaction in ticket.reactions" :key="reaction.id">
        <p>{{ getUserById(reaction.user_id).value.name }}:</p>
        <p>{{ reaction.content }}</p>
        <br>
    </div>
    <p><b>Acties:</b></p>
    <RouterLink :to="{ name: 'tickets.edit', params: { id: ticket.id } }">Bewerk</RouterLink>&nbsp;&nbsp;
    <RouterLink :to="{ name: 'tickets.edit-assigned', params: { id: ticket.id } }">Wijs administrator toe</RouterLink>&nbsp;&nbsp;
    <RouterLink :to="{ name: 'tickets.edit-status', params: { id: ticket.id } }">Wijzig status</RouterLink>&nbsp;&nbsp;
    <button @click="handleDelete" style="cursor: pointer;">Verwijder</button>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { deleteTicket, fetchTicket, formatStatus, getTicketById } from '../store';
import { ref } from 'vue';
import { getUserById } from '../../users/store';
import { formatDate } from '../../../services/helpers';

const route = useRoute()
const router = useRouter();

fetchTicket(Number(route.params.id));

const ticket = ref(getTicketById(Number(route.params.id)));

const handleDelete = async () => {
    await deleteTicket(ticket.value.id);
    router.push({ name: 'tickets.overview' });
};
</script>