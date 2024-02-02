<template>
  <GuestLayout>
    <Card class="w-full max-w-[350px]">
      <form @submit.prevent="handleSubmit">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <KeyIcon class="w-8 h-8 text-foreground" />
            Create an account
          </CardTitle>

          <CardDescription>
            Already have an account?
            <router-link class="text-foreground font-medium hover:underline" to="/login"
              >Login</router-link
            >
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="email" type="email" v-model="form.email" />
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="password" type="password" v-model="form.password" />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex px-6">
          <Button class="flex items-center gap-2 w-full" :disabled="isLoading">
            <Loader
              v-if="isLoading"
              class="w-4 h-4 animate-spin"
              fill="var(--primary-foreground) t"
            />
            Create account
          </Button>
        </CardFooter>
      </form>
    </Card>
  </GuestLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import GuestLayout from '@/components/Layout/GuestLayout.vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { KeyIcon, Loader } from 'lucide-vue-next'
import { useAuthenticationStore } from '@/stores/authentication'
import { useLoadingStore } from '@/stores/loading'

const form = ref({
  email: '',
  password: ''
})

const authenticationStore = useAuthenticationStore()
const loadingStore = useLoadingStore()

const isLoading = computed(() => loadingStore.isLoading('authentication/createAccount'))

async function handleSubmit() {
  await authenticationStore.createAccount(form.value)
}
</script>
