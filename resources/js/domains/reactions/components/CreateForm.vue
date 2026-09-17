<template>
    <form @submit.prevent="handleSubmit">
        <label for="content"><i>Nieuwe reactie:</i></label><br>
        <input id="content" v-model="form.content" type="text" required />
        <FormError name="content" /><br>

        <button type="submit" style="cursor: pointer;">Plaats reactie</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';

const props = defineProps({ reaction: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.reaction });
const handleSubmit = () => emit('submit', form.value);
</script>