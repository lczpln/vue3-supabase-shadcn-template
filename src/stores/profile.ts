import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Profile } from '@/types/profile'
import { supabase } from '@/api/supabase'
import { toast } from 'vue-sonner'
import { useAuthenticationStore } from './authentication'

export const useProfileStore = defineStore('profile', () => {
  const authenticationStore = useAuthenticationStore()

  const profile = ref<Profile | null>(null)
  const username = computed(
    () =>
      profile.value?.username || authenticationStore?.user?.email?.split('@')?.[0] || 'Anonymous'
  )

  async function getProfile() {
    if (!authenticationStore.user) return

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authenticationStore.user.id)
      .single()

    if (error) {
      return toast.error(error.message, {
        description: error.details
      })
    }

    profile.value = data
  }

  async function updateProfile(newProfile: Partial<Profile>) {
    if (!authenticationStore.user) return

    const data = {
      ...profile.value,
      ...newProfile
    } as Profile

    const { error } = await supabase.from('profiles').upsert(data, { onConflict: 'id' })

    if (error) {
      return toast.error(error.message, {
        description: error.details
      })
    }

    await getProfile()
  }

  return { profile, username, getProfile, updateProfile }
})
