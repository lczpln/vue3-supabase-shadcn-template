<template>
  <Dialog :open="isOpen" @update:open="onClose">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Change your settings</DialogDescription>
      </DialogHeader>

      <p class="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>

      <DialogFooter class="flex justify-end">
        <DialogClose as-child>
          <Button variant="secondary" @click="onClose">Close</Button>
          <Button class="flex items-center gap-2" @click="logout" :disabled="isLoading">
            <Loader
              v-if="isLoading"
              class="w-4 h-4 animate-spin"
              fill="var(--primary-foreground)"
            />
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
import { useLoadingStore } from '@/stores/loading'
import { Loader } from 'lucide-vue-next'
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

const authenticationStore = useAuthenticationStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading('authentication/logout'))

const { isOpen, onClose } = useHashModal('settings')

async function logout() {
  await authenticationStore.logout()
  onClose()
}
</script>
