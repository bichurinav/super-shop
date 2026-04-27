<script setup lang="ts">
  import {
    computed,
    onMounted,
    onUnmounted,
    reactive,
    type ShallowRef,
    type CSSProperties,
  } from 'vue'
  import { BaseSpinner } from '~/components/ui'
  import { onClickOutside, type Fn, type MaybeElement } from '@vueuse/core'
  import { useTemplateRef } from 'vue'
  import { type BaseButtonProps } from './types'

  const {
    isLoading,
    theme,
    withOutsideDropdown = false,
    dropdownOptions = {
      style: { top: '50px', right: 0 },
      animationName: 'slide',
      toContainer: false,
    },
  } = defineProps<BaseButtonProps>()
  const dropdownState = defineModel('dropdown')
  const buttonRef = useTemplateRef('button')
  let dropdownRef = null
  let stopClickOutside: Fn | null = null

  const emit = defineEmits<{
    action: []
  }>()

  const slots = defineSlots<{
    default?: () => void
    leftIcon?: () => void
    rightIcon?: () => void
    badge?: () => void
    onlyIcon?: () => void
    dropdown?: () => void
  }>()

  const dynamicClasses = computed(() => {
    return {
      'base-button__button--with-content': slots.default,
      'base-button__button--theme-primary': theme === 'primary',
      'base-button__button--theme-dark': theme === 'dark',
      'base-button__button--theme-white': theme === 'white',
      'base-button__button--theme-empty': theme === 'empty',
    }
  })

  const stylePosition = reactive<CSSProperties>({
    position: dropdownOptions.toContainer ? 'static' : 'relative',
  })

  onMounted(() => {
    if (withOutsideDropdown) {
      dropdownRef = useTemplateRef('dropdown')
      stopClickOutside = onClickOutside(
        dropdownRef as Readonly<ShallowRef<MaybeElement>>,
        () => {
          dropdownState.value = false
        },
        { ignore: [buttonRef] },
      )
    }
  })

  onUnmounted(() => {
    if (stopClickOutside) {
      stopClickOutside()
    }
  })
</script>

<template>
  <div class="base-button" :style="stylePosition">
    <button
      ref="button"
      :class="dynamicClasses"
      class="base-button__button"
      @click="emit('action')"
    >
      <BaseSpinner v-if="isLoading" />
      <slot v-if="!isLoading" name="leftIcon" />
      <div v-if="slots.badge" class="base-button__badge">
        <slot name="badge" />
      </div>
      <slot name="onlyIcon" />
      <slot v-if="!slots.onlyIcon" />
      <slot v-if="!isLoading" name="rightIcon" />
    </button>

    <div
      class="base-button__dropdown"
      :class="{
        'is-open': dropdownState && slots.dropdown,
        [dropdownOptions.animationName as string]: !!dropdownOptions.animationName,
      }"
      :style="dropdownOptions.style"
      @click.stop
    >
      <Transition :name="dropdownOptions.animationName">
        <div v-if="dropdownState && slots.dropdown" ref="dropdown">
          <slot name="dropdown" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use 'BaseButton';
</style>
