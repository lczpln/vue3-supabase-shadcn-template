import type { PiniaPluginContext } from 'pinia'
import { useLoadingStore } from '../stores/loading'

export function piniaLoading({ store }: PiniaPluginContext) {
  const loadingStore = useLoadingStore()

  store.$onAction((action) => {
    if (action.store.$id === 'loading') return
    loadingStore.startLoading(action.store.$id, action.name)

    action.after(() => {
      loadingStore.stopLoading(action.store.$id, action.name)
    })
  })

  // Note this has to be typed if you are using TS
  return { creationTime: new Date() }
}
