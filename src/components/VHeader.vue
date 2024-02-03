<template>
  <header class="flex items-center justify-between px-2 md:px-5 py-2 md:py-4 w-full gap-2">
    <router-link to="/" class="flex items-center gap-2">
      <BookHeartIcon />
      Vue 3 + Vite + TypeScript + Shadcn
    </router-link>

    <div class="flex items-center gap-4">
      <nav>
        <router-link to="/about">About</router-link>
      </nav>

      <div class="flex items-center">
        <ThemeSelector />

        <Popover>
          <PopoverTrigger>
            <div class="flex items-center gap-2 rounded-lg py-1 px-4">
              <Avatar>
                <AvatarImage :src="profileStore.profile?.avatar_url || ''" alt="user-avatar" />
                <AvatarFallback>{{ profileStore.avatarFallback }}</AvatarFallback>
              </Avatar>

              <span class="font-bold">{{ profileStore.username }}</span>
            </div>
          </PopoverTrigger>

          <PopoverContent class="w-[200px] p-2" align="end" avoid-collisions>
            <div class="flex flex-col gap-1 text-sm">
              <router-link
                v-for="(option, index) in userOptions"
                :key="index"
                class="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary"
                :to="option.route"
              >
                <component :is="option.icon" :size="20" />
                {{ option.label }}
              </router-link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { BookHeartIcon, CogIcon, LogOutIcon } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useProfileStore } from '@/stores/profile'
import ThemeSelector from './ThemeSelector.vue'

const userOptions = [
  { label: 'Settings', icon: CogIcon, route: '#settings' },
  { label: 'Logout', icon: LogOutIcon, route: '#logout' }
]

const profileStore = useProfileStore()
</script>
