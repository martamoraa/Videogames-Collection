<script setup>
defineProps({
  review: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <blockquote class="quote">
    <p class="quote__text">&laquo;{{ review.cita }}&raquo;</p>
    <footer class="quote__source">
      <span class="quote__outlet">{{ review.mitja }}</span>
      <span v-if="review.autor"> · {{ review.autor }}</span>
      <span v-if="review.nota" class="quote__score">{{ review.nota }}</span>
    </footer>
    <p v-if="review.original" class="quote__original">Original: &ldquo;{{ review.original }}&rdquo;</p>
    <a v-if="review.url" :href="review.url" target="_blank" rel="noopener noreferrer" class="quote__link">
      Llegeix la ressenya completa
    </a>
  </blockquote>
</template>
