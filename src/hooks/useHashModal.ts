import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useHashModal(hashName: string) {
  const router = useRouter()
  const route = useRoute()
  const isOpen = computed(() => route.hash.includes(`#${hashName}`))

  function onClose() {
    router.push({ hash: route.hash.replace(`#${hashName}`, '') })
  }

  function open() {
    router.push({ hash: `${route.hash}#${hashName}` })
  }

  return { isOpen, onClose, open }
}
