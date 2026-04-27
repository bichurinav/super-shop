import { type Id } from '~/shared/types'

export interface MenuItem {
  id: Id
  to: string
  label: string
}
