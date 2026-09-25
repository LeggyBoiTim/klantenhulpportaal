<template>
    <div v-if="sortedUsers">
        <h1><b>Overzicht</b></h1>
        <table>
            <thead>
                <tr>
                    <th @click="sortBy('id')" style="cursor: pointer;">ID {{ getSortIcon('id') }}</th>
                    <th @click="sortBy('title')" style="cursor: pointer;">Titel {{ getSortIcon('title') }}</th>
                    <th @click="sortBy('category_name')" style="cursor: pointer;">Categorie {{ getSortIcon('category_name') }}</th>
                    <th @click="sortBy('status')" style="cursor: pointer;">Status {{ getSortIcon('status') }}</th>
                    <th @click="sortBy('user_name')" style="cursor: pointer;">Aangemaakt door {{ getSortIcon('user_name') }}</th>
                    <th @click="sortBy('created_at')" style="cursor: pointer;">Aangemaakt op {{ getSortIcon('created_at') }}</th>
                    <th @click="sortBy('updated_at')" style="cursor: pointer;">Laatste update op {{ getSortIcon('updated_at') }}</th>
                    <th @click="sortBy('assigned_name')" style="cursor: pointer;">Toegewezen aan {{ getSortIcon('assigned_name') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in sortedUsers" :key="ticket.id">
                    <td style="text-align: right;">{{ ticket.id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.category_name }}</td>
                    <td>{{ formatStatus(ticket.status) }}</td>
                    <td>{{ ticket.user_name }}</td>
                    <td>{{ formatDate(ticket.created_at) }}</td>
                    <td>{{ formatDate(ticket.updated_at) }}</td>
                    <td>{{ ticket.assigned_name ? ticket.assigned_name : 'Nog niet toegewezen' }}</td>
                    <td><RouterLink :to="{ name: 'tickets.show', params: { id: ticket.id } }">Bekijk ticket</RouterLink></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from '../../../services/helpers/date';
import { sortTable } from '../../../services/helpers/table';
import { formatStatus } from '../../tickets/store';
import { fetchAllUsers, getUsers, User } from '../store';

fetchAllUsers();

const { sortedItems: sortedUsers, sortBy, getSortIcon } = sortTable<User>(
    getUsers,
    'created_at',
    'desc'
);
</script>