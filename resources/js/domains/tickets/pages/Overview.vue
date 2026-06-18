<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Titel</th>
                <th>Categorieën</th>
                <th>Status</th>
                <th>Aangemaakt door</th>
                <th>Aangemaakt op</th>
                <th>Laatste update op</th>
                <th>Toegewezen aan</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ticket in getTickets" :key="ticket.id">
                <td>{{ ticket.id }}</td>
                <td>{{ ticket.title }}</td>
                <td>{{ getCategoryById(ticket.category_id).value.title }}</td>
                <td>{{ ticket.status }}</td>
                <td>{{ getUserById(ticket.user_id).value.name }}</td>
                <td>{{ ticket.created_at }}</td>
                <td>{{ ticket.updated_at }}</td>
                <td>{{ ticket.assigned_id }}</td>
                <td><RouterLink :to="{ name: 'tickets.show', params: { id: ticket.id } }">Bekijk</RouterLink></td>
                <td><RouterLink :to="{ name: 'tickets.edit', params: { id: ticket.id } }">Bewerk</RouterLink></td>
                <td><button @click="deleteTicket(ticket.id)" style="cursor: pointer;">Verwijder</button></td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { getCategoryById } from '../../categories/store';
import { getUserById } from '../../users/store';
import { getTickets, deleteTicket } from '../store';
</script>