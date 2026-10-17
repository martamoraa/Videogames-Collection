<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usuari, iniciarSessio, registrar, missatgeError } from '../services/auth'

const router = useRouter()
const nom = ref('')
const contrasenya = ref('')
const modeRegistre = ref(false)
const error = ref('')
const enviant = ref(false)

watch(
  usuari,
  (u) => {
    if (u) router.replace({ name: 'games' })
  },
  { immediate: true }
)

function canviaMode() {
  modeRegistre.value = !modeRegistre.value
  error.value = ''
}

async function envia() {
  error.value = ''
  enviant.value = true
  try {
    if (modeRegistre.value) await registrar(nom.value, contrasenya.value)
    else await iniciarSessio(nom.value, contrasenya.value)
  } catch (e) {
    error.value = missatgeError(e)
  } finally {
    enviant.value = false
  }
}
</script>

<template>
  <section class="page page--auth">
    <h1 class="btn-black page__title">Registre</h1>

    <form class="auth" @submit.prevent="envia">
      <label class="sr-only" for="usuari">Usuari</label>
      <input
        id="usuari"
        v-model="nom"
        class="field"
        type="text"
        placeholder="Usuari"
        autocomplete="username"
        required
      />

      <label class="sr-only" for="contrasenya">Contrasenya</label>
      <input
        id="contrasenya"
        v-model="contrasenya"
        class="field"
        type="password"
        placeholder="Contrasenya"
        :autocomplete="modeRegistre ? 'new-password' : 'current-password'"
        required
      />

      <p v-if="error" class="auth__error" role="alert">{{ error }}</p>

      <button type="submit" class="field field--button" :disabled="enviant">
        {{ modeRegistre ? "Registra't" : 'Log In' }}
      </button>

      <p class="auth__switch">
        <template v-if="modeRegistre">
          Ja tens un compte?
          <button type="button" class="auth__link" @click="canviaMode">Log In</button>
        </template>
        <template v-else>
          No tens un compte?
          <button type="button" class="auth__link" @click="canviaMode">Registra't</button>
        </template>
      </p>
    </form>

    <img class="auth__logo" src="/img/lluerna.png" alt="" />
  </section>
</template>
