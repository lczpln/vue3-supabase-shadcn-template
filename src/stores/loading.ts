import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref<Record<string, boolean>>({})
  const isLoading = computed(() => (key: string) => loading.value[key] ?? false)

  function startLoading(storeName: string, actionName: string) {
    loading.value[`${storeName}/${actionName}`] = true
  }

  function stopLoading(storeName: string, actionName: string) {
    loading.value[`${storeName}/${actionName}`] = false
  }

  return {
    startLoading,
    stopLoading,
    isLoading
  }
})
