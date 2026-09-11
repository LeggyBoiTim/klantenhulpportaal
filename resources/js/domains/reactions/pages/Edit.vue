<template>
    <EditForm :reaction="reaction" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Updatable } from '../../../services/store';
import { getReactionById, Reaction, reactionStore, updateReaction } from '../store';
import EditForm from '../components/EditForm.vue';

const router = useRouter();
const props = defineProps({ id: Number });

// fetchReaction(Number(props.id));

const reaction = ref();

const fetchReaction = async (id) => {
    await reactionStore.actions.getById(id);
    reaction.value = reactionStore.getters.byId(id);
}

fetchReaction(Number(props.id));

console.log(reaction.value);

// console.log(getReactionById(Number(props.id)).value);

const handleSubmit = async (data: Reaction) => {
    await updateReaction(Number(props.id), data);
    router.push({ name: 'tickets.show', params: { id: data.ticket_id } });
};
</script>