<script setup>
defineProps({
  type: {
    type: String,
    default: 'loading',
    validator: (value) => ['loading', 'empty', 'error'].includes(value)
  },
  message: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <p class="status" :class="`status--${type}`" role="status">{{ message }}</p>
</template>
