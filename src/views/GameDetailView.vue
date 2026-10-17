<script setup>
import { ref, computed, watch } from 'vue'
import { getVideojoc } from '../services/videojocs'
import { detallsDe } from '../data/detalls'
import ReviewQuote from '../components/ReviewQuote.vue'
import StatusMessage from '../components/StatusMessage.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const game = ref(null)
const loading = ref(true)
const error = ref(null)

async function carrega(id) {
  loading.value = true
  error.value = null
  game.value = null
  try {
    game.value = await getVideojoc(id)
  } catch (e) {
    console.error(e)
    error.value = "No s'ha pogut carregar el videojoc. Torna-ho a provar més tard."
  } finally {
    loading.value = false
  }
}

watch(() => props.id, carrega, { immediate: true })

const extra = computed(() => detallsDe(game.value?.titol))

function extreuIdYoutube(valor) {
  const text = String(valor ?? '').trim()
  const m = text.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)
  if (m) return m[1]
  return /^[\w-]{11}$/.test(text) ? text : ''
}

const trailerId = computed(() => extreuIdYoutube(game.value?.trailer || extra.value.trailer))

const trailerEmbed = computed(
  () => `https://www.youtube.com/embed/${trailerId.value}?autoplay=1&mute=1&rel=0&playsinline=1`
)
const trailerEnllac = computed(() => `https://www.youtube.com/watch?v=${trailerId.value}`)

const resum = computed(() => {
  const r = game.value?.resum_llarg || extra.value.resum_llarg || game.value?.descripcio || []
  return Array.isArray(r) ? r : [r]
})

const ressenyes = computed(() => {
  const r = game.value?.ressenyes
  return Array.isArray(r) && r.length ? r : (extra.value.ressenyes ?? [])
})
</script>

<template>
  <section class="page">
    <StatusMessage v-if="loading" type="loading" message="S'està carregant el videojoc..." />
    <StatusMessage v-else-if="error" type="error" :message="error" />
    <StatusMessage v-else-if="!game" type="empty" message="No hem trobat aquest videojoc." />

    <template v-else>
      <h1 class="btn-black page__title">{{ game.titol }}</h1>

      <article class="detail">
        <div v-if="trailerId" class="detail__panel">
          <div class="video">
            <iframe
              :key="trailerId"
              :src="trailerEmbed"
              :title="`Tràiler de ${game.titol}`"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
            ></iframe>
          </div>
          <p class="detail__note">
            El tràiler s'inicia automàticament i sense so; activa el volum des del reproductor.
            <a :href="trailerEnllac" target="_blank" rel="noopener noreferrer">Obre'l a YouTube</a>
          </p>
        </div>

        <ul class="detail__facts">
          <li class="tag">{{ game.genere }}</li>
          <li class="tag">{{ game.plataforma }}</li>
          <li class="tag">{{ game.any }}</li>
          <li class="tag">{{ game.desenvolupador }}</li>
          <li class="tag tag--score">{{ game.valoracio }}/10</li>
        </ul>

        <div class="detail__block">
          <h2 class="detail__heading">Resum</h2>
          <p v-for="(p, i) in resum" :key="i" class="detail__text">{{ p }}</p>
        </div>

        <div v-if="ressenyes.length" class="detail__block">
          <h2 class="detail__heading">Ressenyes de professionals</h2>
          <p class="detail__note">Cites traduïdes al català; a sota de cada una hi ha el text original.</p>
          <div class="quotes">
            <ReviewQuote v-for="(r, i) in ressenyes" :key="i" :review="r" />
          </div>
        </div>

        <RouterLink to="/games" class="pill detail__back">Tornar a Games</RouterLink>
      </article>
    </template>
  </section>
</template>
