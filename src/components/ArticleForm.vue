<template>
  <form @submit.prevent="onSubmit" class="form">
    <h2>Add new article</h2>
    <input v-model="title" placeholder="Title" required/>
    <textarea v-model="content" placeholder="Content" required></textarea>
    <button type="submit">Add</button>
  </form>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useArticleService} from '../composables/useArticleService';

const title = ref('');
const content = ref('');

const {addArticle} = useArticleService();

function onSubmit() {
  if (!title.value.trim() || !content.value.trim()) return;

  addArticle({
    id: Date.now(),
    title: title.value,
    content: content.value
  });

  title.value = '';
  content.value = '';
}
</script>

<style scoped>
.form {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  gap: 1rem;
  padding: 1rem 0;
}

input, textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
}

button {
  align-self: flex-start;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
