<script setup lang="ts">
  import { BaseButton } from '~/components/ui'
  import { useToggle } from '#imports'
  import { BurgerIcon, CloseIcon, CartIcon, InputSearchIcon } from '~/assets/icons'
  import { BaseInput } from '~/components/ui'

  const [stateMobileMenu, toggleMobileMenu] = useToggle()
</script>

<template>
  <nav class="nav-mobile">
    <BaseButton>
      <template #onlyIcon>
        <CartIcon />
      </template>
    </BaseButton>
    <BaseButton
      v-model:dropdown="stateMobileMenu"
      :dropdown-options="{
        style: { top: '50px', left: 0, width: '100%' },
        animationName: 'slide',
        toContainer: true,
      }"
      style="margin-left: auto"
      @action="() => toggleMobileMenu()"
    >
      <template #onlyIcon>
        <BurgerIcon v-if="!stateMobileMenu" class="nav-mobile__burger-icon" />
        <CloseIcon v-else />
      </template>
      <template #dropdown>
        <BaseInput class="nav-mobile__search" placeholder="Search" theme="secondary">
          <template #leftIcon>
            <InputSearchIcon />
          </template>
        </BaseInput>
        <NavigationApp />
      </template>
    </BaseButton>
  </nav>
</template>

<style lang="scss">
  @use './NavigationMobile';
</style>
