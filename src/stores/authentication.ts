import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/api/supabase'
import { toast } from 'vue-sonner'

export const useAuthenticationStore = defineStore('authentication', () => {
  const user = ref<User | null>(null)

  function setUser(newUser: User | null) {
    user.value = newUser
  }

  async function createAccount(formData: { email: string; password: string }) {
    const { error } = await supabase.auth.signUp(formData)

    if (error) {
      return toast.error(error.name, {
        description: error.message
      })
    }
  }

  async function login(formData: { email: string; password: string }) {
    const { error } = await supabase.auth.signInWithPassword(formData)

    if (error) {
      return toast.error(error.name, {
        description: error.message
      })
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return toast.error(error.name, {
        description: error.message
      })
    }
  }

  return { user, setUser, createAccount, login, logout }
})
