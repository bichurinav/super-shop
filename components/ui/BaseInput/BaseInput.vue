<script setup lang="ts">
  import { BaseButton } from '~/components/ui'
  import { type BaseInputProps } from './types'
  import { computed } from 'vue'

  const { placeholder = '', theme = 'primary' } = defineProps<BaseInputProps>()
  const model = defineModel()

  const emit = defineEmits<{
    submit: [event: SubmitEvent, field: HTMLInputElement]
  }>()

  const submit = (event: SubmitEvent) => {
    const form = event.target as HTMLFormElement
    emit('submit', event, form.elements.namedItem('base-input') as HTMLInputElement)
  }

  const slots = defineSlots<{
    leftIcon?: () => void
    rightIcon?: () => void
  }>()

  const dynamicClasses = computed(() => {
    return {
      'base-input--with-left-icon': !!slots.leftIcon,
      'base-input--with-right-icon': !!slots.rightIcon,
      'base-input--theme-primary': theme === 'primary',
      'base-input--theme-secondary': theme === 'secondary',
    }
  })
</script>

<template>
  <form class="base-input" :class="dynamicClasses" @submit.prevent="submit">
    <div class="base-input__inner">
      <div class="base-input-icon base-input-icon--left">
        <BaseButton class="base-input-action base-input__action">
          <template #onlyIcon>
            <slot name="leftIcon" />
          </template>
        </BaseButton>
      </div>
      <input
        v-model="model"
        name="base-input"
        :placeholder="placeholder"
        class="base-input__field"
        type="text"
      />
      <div class="base-input-icon base-input-icon--right">
        <BaseButton class="base-input-action base-input__action">
          <template #onlyIcon>
            <slot name="rightIcon" />
          </template>
        </BaseButton>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
  @use './BaseInput';
</style>
