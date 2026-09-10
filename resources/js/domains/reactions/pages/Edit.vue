<template>
    <EditForm :reaction="reaction" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Updatable } from '../../../services/store';
import { getReactionById, Reaction, updateReaction } from '../store';
import EditForm from '../components/EditForm.vue';

const router = useRouter();
const props = defineProps({ id: Number });

const reaction = ref<Updatable<Reaction>>(getReactionById(Number(props.id)).value);

const handleSubmit = async (data: Reaction) => {
    await updateReaction(Number(props.id), data);
    router.push({ name: 'tickets.show', params: { id: data.ticket_id } });
};
</script>