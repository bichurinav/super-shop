import { type CSSProperties } from 'vue'

export interface DropdownOptions {
  style?: CSSProperties
  animationName?: string
  toContainer?: boolean
}

export interface BaseButtonProps {
  isLoading?: boolean
  theme?: 'primary' | 'dark' | 'white' | 'empty'
  withOutsideDropdown?: boolean
  dropdownOptions?: DropdownOptions
}
