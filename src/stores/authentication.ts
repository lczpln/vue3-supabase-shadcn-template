import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'

export const useAuthenticationStore = defineStore('authentication', () => {
  const user = ref<User | null>(null)

  return { user }
})
