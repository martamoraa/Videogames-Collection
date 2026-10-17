<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usuari, sortir } from '../services/auth'

const route = useRoute()
const router = useRouter()
const cerca = ref(route.query.q ?? '')

const etiquetaAcces = computed(() => (route.name === 'registre' ? 'Log In' : 'Registre'))

function alEscriure() {
  const text = cerca.value.trim()
  router.replace({ name: 'games', query: text ? { q: text } : {} })
}

watch(
  () => route.fullPath,
  () => {
    cerca.value = route.name === 'games' ? (route.query.q ?? '') : ''
  }
)

async function tancaSessio() {
  await sortir()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="header__logo" aria-label="Inici">
      <img src="/img/logo.png" alt="VG" />
    </RouterLink>

    <nav class="header__nav" aria-label="Navegació principal">
      <RouterLink to="/" class="pill" exact-active-class="is-active">Inici</RouterLink>
      <RouterLink to="/games" class="pill" active-class="is-active">Games</RouterLink>

      <button v-if="usuari" type="button" class="pill" @click="tancaSessio">Sortir</button>
      <RouterLink v-else to="/registre" class="pill" active-class="is-active">
        {{ etiquetaAcces }}
      </RouterLink>

      <form class="pill search" role="search" @submit.prevent="alEscriure">
        <svg class="search__icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2" />
          <line x1="15.5" y1="15.5" x2="22" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <input
          v-model="cerca"
          type="search"
          class="search__input"
          aria-label="Cerca videojocs"
          autocomplete="off"
          @input="alEscriure"
        />
      </form>
    </nav>
  </header>
</template>
