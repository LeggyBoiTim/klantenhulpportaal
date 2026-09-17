<template>
    <form @submit.prevent="handleSubmit">
        <label for="content"></label>
        <input id="content" v-model="form.content" type="text" required autofocus/>
        <FormError name="content" /><br>

        <button type="submit" style="cursor: pointer;">Wijzig reactie</button>&nbsp;&nbsp;
        <button type="button" @click="emit('cancel')" style="cursor: pointer;">Annuleer</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';

const props = defineProps({ reaction: Object });
const emit = defineEmits(['submit', 'cancel']);
const form = ref({ ...props.reaction });
const handleSubmit = () => emit('submit', form.value);
</script>