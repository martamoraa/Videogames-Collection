<script setup>
defineProps({
  game: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <RouterLink :to="{ name: 'game', params: { id: game.id } }" class="card">
    <div class="card__header">
      <h2 class="card__title">{{ game.titol }}</h2>
      <span class="card__year">{{ game.any }}</span>
    </div>
    <p class="card__tags">
      <span class="tag">{{ game.genere }}</span>
      <span class="tag">{{ game.plataforma }}</span>
    </p>
    <p class="card__desc">{{ game.descripcio }}</p>
    <p class="card__footer">
      <span class="card__dev">{{ game.desenvolupador }}</span>
      <span class="card__rating">{{ game.valoracio }}/10</span>
    </p>
  </RouterLink>
</template>
