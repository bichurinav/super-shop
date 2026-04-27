import { useMediaQuery } from '@vueuse/core'
import { computed, onMounted, watch } from 'vue'
import { useState } from '#app'
import { Breakpoints } from '~/shared/types'

let mediaQuerySubscribed = false

export function useScreen() {
  const isDesktop = useState('layout-is-desktop', () => false)
  const isMobile = computed(() => !isDesktop.value)

  if (import.meta.client && !mediaQuerySubscribed) {
    mediaQuerySubscribed = true
    onMounted(() => {
      const mq = useMediaQuery(`(min-width: ${Breakpoints.xxl}px)`)
      watch(
        mq,
        (v) => {
          isDesktop.value = v
        },
        { immediate: true },
      )
    })
  }

  return { isDesktop, isMobile }
}
