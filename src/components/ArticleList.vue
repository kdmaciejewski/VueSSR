<template>
  <div class="grid-container">
    <h2>Article List</h2>
    <div v-for="article in articles" :key="article.id" class="article-card">
      <h3>{{ article.title }}</h3>
      <p>{{ article.content }}</p>
      <button @click="deleteArticle(article.id)">🗑️ Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useArticleService} from '../composables/useArticleService';

const {articles, deleteArticle} = useArticleService();
</script>

<style scoped>
.grid-container {
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}

.article-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
}
</style>
