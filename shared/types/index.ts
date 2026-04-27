import type { Component, ShallowRef, ComputedRef } from 'vue'
export type Id = string | number

export enum Breakpoints {
  m = 288,
  l = 697,
  xl = 937,
  xxl = 1217,
}

export interface ActionItem {
  id: Id
  name: string
  label?: string
  action: () => void
  icon: Component
  stateDropdown?: boolean | ShallowRef<boolean>
  showCondition: boolean | ComputedRef<boolean>
}
