<template>
  <div class="default-layout">
    <div class="default-layout__container container">
      <HeaderApp />
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
  .default-layout {
    &__container {
      margin-top: 64px;

      @media (max-width: $breakpoints-xxl) {
        margin-top: 4px;
      }
    }
  }
</style>
