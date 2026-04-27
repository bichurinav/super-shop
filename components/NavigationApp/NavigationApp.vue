<script setup lang="ts">
  import { ref, markRaw, computed } from 'vue'
  import { useToggle } from '#imports'
  import { BaseButton, BaseInput } from '~/components/ui'
  import { useScreen } from '~/composables/useScreen'
  import { SearchIcon, CartIcon, ProfileIcon, LogoutIcon, InputSearchIcon } from '~/assets/icons'
  import { type MenuItem } from './types'
  import { type ActionItem } from '~/shared/types'
  const [stateSearchDropdown, toggleSearch] = useToggle()

  const { isDesktop, isMobile } = useScreen()

  const menuList: MenuItem[] = [
    { id: 'menu-link' + 0, to: '/', label: 'Shop' },
    { id: 'menu-link' + 1, to: '/blog', label: 'Blog' },
    { id: 'menu-link' + 2, to: '/our-story', label: 'Our Story' },
  ]

  const menuListMobile: MenuItem[] = [
    ...menuList,
    { id: 'mobile-menu-link' + 0, to: '/our-story', label: 'Contact' },
    { id: 'mobile-menu-link' + 1, to: '/our-story', label: 'Terms of Services' },
    { id: 'mobile-menu-link' + 2, to: '/our-story', label: 'Shipping And Returns' },
  ]

  const currentMenuList = computed(() => (isDesktop.value ? menuList : menuListMobile))

  const actionList = ref<ActionItem[]>([
    {
      id: 'action' + 0,
      name: 'search',
      action: () => toggleSearch(),
      icon: markRaw(SearchIcon),
      stateDropdown: stateSearchDropdown,
      showCondition: !isMobile.value,
    },
    {
      id: 'action' + 1,
      name: 'cart',
      action: () => console.log('cart'),
      icon: markRaw(CartIcon),
      stateDropdown: false,
      showCondition: !isMobile.value,
    },
    {
      id: 'action' + 2,
      name: 'profile',
      label: 'My account',
      action: () => console.log('profile'),
      icon: markRaw(ProfileIcon),
      stateDropdown: false,
      showCondition: true,
    },
    {
      id: 'action' + 3,
      label: 'Logout',
      name: 'logout',
      action: () => console.log('logout'),
      icon: markRaw(LogoutIcon),
      stateDropdown: false,
      showCondition: isMobile.value,
    },
  ])
</script>

<template>
  <nav class="navigation">
    <div class="navigation-links">
      <NuxtLink
        v-for="link in currentMenuList"
        :key="link.id"
        class="navigation-links__item"
        :to="link.to"
      >
        {{ link.label }}
      </NuxtLink>
    </div>

    <div class="navigation__divider" />

    <div class="navigation-actions">
      <template v-for="item in actionList" :key="item.id">
        <BaseButton
          v-if="item.showCondition"
          v-model:dropdown="item.stateDropdown"
          :dropdownOptions="{
            style: { top: '47px', right: 0 },
            animationName: 'slide',
            toContainer: false,
          }"
          theme="empty"
          :withOutsideDropdown="true"
          class="navigation-actions__item"
          @action="item.action"
        >
          <template v-if="isDesktop" #onlyIcon>
            <component :is="item.icon" />
          </template>

          <template v-if="isMobile" #leftIcon>
            <component :is="item.icon" />
          </template>

          <template v-if="item.label && isMobile" #default>
            {{ item.label }}
          </template>

          <template v-if="item.name === 'search'" #dropdown>
            <div class="navigation-actions__search-dropdown">
              <BaseInput placeholder="Search" theme="secondary">
                <template #leftIcon>
                  <InputSearchIcon />
                </template>
              </BaseInput>
            </div>
          </template>
        </BaseButton>
      </template>
    </div>
  </nav>
</template>

<style lang="scss">
  @use './NavigationApp';
</style>
