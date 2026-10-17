<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="dome">
    <RouterView />
  </main>
  <footer class="footer">
    <p>By Marta &lt;3</p>
  </footer>
</template>
