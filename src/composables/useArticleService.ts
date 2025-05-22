import { ref } from 'vue';
import type { Article } from '../models/Article';

const articles = ref<Article[]>(Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  title: `Article ${i + 1}`,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
})));

export function useArticleService() {
  const addArticle = (article: Article) => {
    articles.value.push(article);
  };

  const deleteArticle = (id: number) => {
    articles.value = articles.value.filter(a => a.id !== id);
  };

  return {
    articles,
    addArticle,
    deleteArticle
  };
}
