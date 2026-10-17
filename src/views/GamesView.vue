<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getVideojocs } from '../services/videojocs'
import GameCard from '../components/GameCard.vue'
import StatusMessage from '../components/StatusMessage.vue'

const route = useRoute()
const games = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    games.value = await getVideojocs()
  } catch (e) {
    console.error(e)
    error.value = "No s'han pogut carregar els videojocs. Torna-ho a provar més tard."
  } finally {
    loading.value = false
  }
})

const filtrats = computed(() => {
  const q = String(route.query.q ?? '').trim().toLowerCase()
  if (!q) return games.value
  return games.value.filter((g) =>
    [g.titol, g.genere, g.plataforma, g.desenvolupador]
      .filter(Boolean)
      .some((camp) => String(camp).toLowerCase().includes(q))
  )
})
</script>

<template>
  <section class="page">
    <h1 class="btn-black page__title">Games</h1>

    <StatusMessage v-if="loading" type="loading" message="S'estan carregant els videojocs..." />
    <StatusMessage v-else-if="error" type="error" :message="error" />
    <StatusMessage
      v-else-if="games.length === 0"
      type="empty"
      message="Encara no hi ha cap videojoc a la col·lecció."
    />
    <StatusMessage
      v-else-if="filtrats.length === 0"
      type="empty"
      message="Cap videojoc coincideix amb la cerca."
    />

    <div v-else class="grid">
      <GameCard v-for="game in filtrats" :key="game.id" :game="game" />
    </div>
  </section>
</template>
