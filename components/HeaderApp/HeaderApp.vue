<script setup lang="ts">
  import { type HeaderAppProps } from './types'
  import { useScreen } from '~/composables/useScreen'
  import { LogoIcon } from '~/assets/icons'

  const { withSectionLine = true } = defineProps<HeaderAppProps>()

  const { isDesktop, isMobile } = useScreen()
</script>

<template>
  <div class="header">
    <div class="header__inner">
      <NuxtLink class="header__logo" to="/">
        <LogoIcon />
      </NuxtLink>

      <NavigationApp v-if="isDesktop" class="header__navigation" />

      <NavigationMobile v-if="isMobile" class="header__mobile-nav" />
    </div>
    <div v-if="withSectionLine && !isMobile" class="header__section-line" />
  </div>
</template>

<style lang="scss">
  @use './HeaderApp';
</style>
