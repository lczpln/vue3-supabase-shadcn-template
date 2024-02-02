<template>
  <VHeader />
  <main class="px-2 md:px-5 py-2 md:py-4 flex-1">
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import VHeader from '@/components/VHeader.vue'
</script>
