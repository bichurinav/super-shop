<script setup lang="ts">
  import { useScreen } from './composables/useScreen'

  useScreen()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
