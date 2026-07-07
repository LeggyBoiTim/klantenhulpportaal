<template>
    <h1><b>Details Ticket</b></h1><br>
    <h2><b>Titel:</b> {{ ticket.title }}</h2><br>
    <p><b>Beschrijving:</b><br>{{ ticket.content }}</p><br>
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
    <button @click="deleteTicket(ticket.id)" style="cursor: pointer;">Verwijder</button>&nbsp;
    <RouterLink :to="{ name: 'tickets.assign', params: { id: ticket.id } }">Toewijzen</RouterLink>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { deleteTicket, getTicketById, Status } from '../store';
import { ref } from 'vue';
import { getUserById } from '../../users/store';

const route = useRoute()

const ticket = ref(getTicketById(Number(route.params.id)));

const formatDate = (date: Date) => {
    let newDate = new Date(date);
    return newDate.toLocaleDateString("nl-NL", {day: "2-digit", month: "2-digit", year: "numeric"}) + ' ' + newDate.toLocaleTimeString("nl-NL");
}

const formatStatus = (status: Status) => {
    return status === Status.Open ? "In afwachting" : status === Status.InProgress ? "In behandeling" : "Afgehandeld";
}
</script>