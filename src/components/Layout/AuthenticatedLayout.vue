<template>
  <VHeader class="animate__animated animate__fadeIn" />
  <main class="px-2 md:px-5 py-2 md:py-4 flex-1 animate__animated animate__fadeIn">
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import VHeader from '@/components/VHeader.vue'
</script>
