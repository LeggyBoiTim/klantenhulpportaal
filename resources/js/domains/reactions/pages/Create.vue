<template>
    <i>Reactie plaatsen</i>
    <Form :reaction="reaction" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { createReaction, Reaction } from '../store';
import { currentUser } from '../../auth/store';
import Form from '../components/Form.vue';
import { New } from '../../../services/store';

const route = useRoute();
const router = useRouter();

const reaction = ref<New<Reaction>>({
    ticket_id: Number(route.params.id),
    user_id: currentUser.value?.id,
    content: '',
    user_name: '',
    ticket_title: ''
});

const handleSubmit = async (data: Reaction) => {
    await createReaction(data);
    router.push({ name: 'tickets.show', params: { id: data.ticket_id } });
};
</script>