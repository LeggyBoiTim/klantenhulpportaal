<template>
    <h1><b>Details Ticket</b></h1><br>
    <h2><b>Titel:</b> {{ ticket.title }}</h2><br>
    <p><b>Beschrijving:</b><br>{{ ticket.content }}</p><br>
    <p><b>Categorie:</b><br>{{ getCategoryById(ticket.category_id).value?.title }}</p><br>
    <p><b>Status:</b> {{ formatStatus(ticket.status) }}</p><br>
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
    <RouterLink :to="{ name: 'tickets.edit', params: { id: ticket.id } }">Bewerk</RouterLink>&nbsp;
    <button @click="handleDelete" style="cursor: pointer;">Verwijder</button>&nbsp;
    <RouterLink :to="{ name: 'tickets.assign', params: { id: ticket.id } }">Toewijzen</RouterLink>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { deleteTicket, formatStatus, getTicketById } from '../store';
import { ref } from 'vue';
import { getUserById } from '../../users/store';
import { formatDate } from '../../../services/helpers';
import { getCategoryById } from '../../categories/store';

const route = useRoute()
const router = useRouter();

const ticket = ref(getTicketById(Number(route.params.id)));

const handleDelete = async () => {
    await deleteTicket(ticket.value.id);
    router.push({ name: 'tickets.overview' });
};
</script>