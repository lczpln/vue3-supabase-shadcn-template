<template>
  <AlertDialog :open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Logout</AlertDialogTitle>
        <AlertDialogDescription>Are you sure you want to logout?</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="onClose">Cancel</AlertDialogCancel>
        <AlertDialogAction class="flex items-center gap-2" @click="logout" :disabled="isLoading">
          <Loader v-if="isLoading" class="w-4 h-4 animate-spin" fill="var(--primary-foreground)" />
          Logout
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthenticationStore } from '@/stores/authentication'
import { useLoadingStore } from '@/stores/loading'
import { Loader } from 'lucide-vue-next'
import { useHashModal } from '@/hooks/useHashModal'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

const authenticationStore = useAuthenticationStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading('authentication/logout'))

const { isOpen, onClose } = useHashModal('logout')

async function logout() {
  await authenticationStore.logout()
  onClose()
}
</script>
