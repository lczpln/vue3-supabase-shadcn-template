<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthenticationStore } from '@/stores/authentication'
import { supabase } from '@/api/supabase'
import { Toaster } from '@/components/ui/sonner'
import { useProfileStore } from '@/stores/profile'
import ModalsWrapper from '@/components/Modals/ModalsWrapper.vue'

const authenticationStore = useAuthenticationStore()
const profileStore = useProfileStore()
const router = useRouter()

async function getProfile() {
  await profileStore.getProfile()
}

function themeSelector() {
  const theme = localStorage.getItem('theme')

  if (theme) {
    document.body.classList.add(theme)
  } else {
    document.body.classList.add('dark')
  }
}

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      authenticationStore.setUser(session.user)
    } else {
      authenticationStore.setUser(null)
    }

    if (event === 'SIGNED_IN') {
      router.push({ name: 'dashboard' })
      getProfile()
    } else if (event === 'SIGNED_OUT') {
      router.push({ name: 'login' })
    }
  })

  themeSelector()
})
</script>

<template>
  <div class="flex flex-col min-h-svh w-screen">
    <RouterView />
    <ModalsWrapper />
    <Toaster position="top-right" />
  </div>
</template>
