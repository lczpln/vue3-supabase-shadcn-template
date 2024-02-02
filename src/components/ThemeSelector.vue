<template>
  <Button @click="toggleTheme" variant="ghost" type="button">
    <Sun v-if="theme === 'light'" :size="20" />
    <Moon v-else :size="20" />
  </Button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './ui/button'
import { Sun, Moon } from 'lucide-vue-next'
import defaults from '@/constants/defaults'

const theme = ref(localStorage.getItem('theme') || defaults.DEFAULT_THEME)

function toggleTheme() {
  if (theme.value === 'dark') {
    document.body.classList.remove('dark')
    document.body.classList.add('light')
    localStorage.setItem('theme', 'light')
    theme.value = 'light'
  } else {
    document.body.classList.remove('light')
    document.body.classList.add('dark')
    localStorage.setItem('theme', 'dark')
    theme.value = 'dark'
  }
}
</script>

<style scoped></style>
