<template>
  <Dialog :open="isOpen" @update:open="onClose">
    <DialogContent class="sm:max-w-md" as-child>
      <form @submit.prevent="handleSubmit">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Change your settings</DialogDescription>
        </DialogHeader>

        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" v-model="form.username" />
          </div>

          <div class="flex flex-col space-y-1.5">
            <Label htmlFor="avatar_url">Avatar URL</Label>
            <Input id="avatar_url" type="text" v-model="form.avatar_url" />
          </div>
        </div>

        <DialogFooter class="flex justify-end">
          <DialogClose as-child>
            <Button variant="outline" type="button" @click="onClose">Close</Button>
            <Button class="flex items-center gap-2" type="submit" :disabled="isLoading">
              <Loader
                v-if="isLoading"
                class="w-4 h-4 animate-spin"
                fill="var(--primary-foreground)"
              />
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import { Loader } from 'lucide-vue-next'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useProfileStore } from '../../stores/profile'
import { useHashModal } from '@/hooks/useHashModal'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import type { Profile } from '@/types/profile'

const profileStore = useProfileStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading('profile/updateProfile'))

const { isOpen, onClose } = useHashModal('settings')

const form = ref<Partial<Profile>>({
  username: '',
  avatar_url: ''
})

async function handleSubmit() {
  await profileStore.updateProfile(form.value)
  onClose()
}

watch(isOpen, (value) => {
  if (value) {
    form.value = {
      username: profileStore.username || '',
      avatar_url: profileStore.profile?.avatar_url || ''
    }
  }
})
</script>
