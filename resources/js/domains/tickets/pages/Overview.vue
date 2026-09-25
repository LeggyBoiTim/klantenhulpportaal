<template>
    <div v-if="sortedTickets">
        <h1><b>Overzicht</b></h1>
        <table>
            <thead>
                <tr>
                    <th @click="sortBy('id')" style="cursor: pointer;">ID {{ getSortIcon('id') }}</th>
                    <th @click="sortBy('title')" style="cursor: pointer;">Titel {{ getSortIcon('title') }}</th>
                    <th @click="sortBy('category_name')" style="cursor: pointer;">Categorie {{ getSortIcon('category_name') }}</th>
                    <th @click="sortBy('status')" style="cursor: pointer;">Status {{ getSortIcon('status') }}</th>
                    <th @click="sortBy('user_last_name')" style="cursor: pointer;">Aangemaakt door {{ getSortIcon('user_last_name') }}</th>
                    <th @click="sortBy('created_at')" style="cursor: pointer;">Aangemaakt op {{ getSortIcon('created_at') }}</th>
                    <th @click="sortBy('updated_at')" style="cursor: pointer;">Laatste update op {{ getSortIcon('updated_at') }}</th>
                    <th @click="sortBy('assigned_last_name')" style="cursor: pointer;">Toegewezen aan {{ getSortIcon('assigned_last_name') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in sortedTickets" :key="ticket.id">
                    <td style="text-align: right;">{{ ticket.id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.category_name }}</td>
                    <td>{{ formatStatus(ticket.status) }}</td>
                    <td>{{ ticket.user_first_name }} {{ ticket.user_last_name }}</td>
                    <td>{{ formatDate(ticket.created_at) }}</td>
                    <td>{{ formatDate(ticket.updated_at) }}</td>
                    <td>{{ ticket.assigned_last_name ? ticket.assigned_first_name.concat(' ', ticket.assigned_last_name) : 'Nog niet toegewezen' }}</td>
                    <td><RouterLink :to="{ name: 'tickets.show', params: { id: ticket.id } }">Bekijk ticket</RouterLink></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { fetchAllTickets, formatStatus, getTickets, Ticket } from '../store';
import { formatDate } from '../../../services/helpers/date';
import { sortTable } from '../../../services/helpers/table';

fetchAllTickets();

const { sortedItems: sortedTickets, sortBy, getSortIcon } = sortTable<Ticket>(
    getTickets,
    'created_at',
    'desc'
);
</script>