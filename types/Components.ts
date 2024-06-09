import { CartItem } from "./Products"

type sizes = 'sm' | 'md' | 'lg'

export type SectionLink = {
  title: string
  href: string
  color?: string
}

export type SectionProps = {
  title?: string
  link?: SectionLink
  slot?: React.ReactNode
  cardMode?: boolean
}

export type BtnLinkProps = {
  href: string
  title: string
  color?: string
}

export type CharmBtnProps = {
  onPress: () => void
  icon?: string
  color?: string
  bgColor?: string
  disabled?: boolean
  size?: string
  iconsSize?: number
}

export type BtnProps = {
  id?: string | number
  onPress?: () => void
  title: string
  bgColor?: string
  color?: string
  icon?: string
  iconColor?: string
  disabled?: boolean
  wrapperClasses?: string
  outlined?: boolean
}

export type BtnGroupProps = {
  buttons: BtnProps[]
  onPress: (btn: BtnProps) => void
  color?: string
  selectedId?: string | number | undefined
}

export type SearchProps = {
  placeholder?: string
  onSubmit: (text: string) => void
}

export type BottomModalProps = {
  isVisible: boolean
  slot: React.ReactNode
  title?: string
  hieght?: string
  onClose: () => void
}

export type CartItemProps = {
  item: CartItem
  onRemove: (item: CartItem) => void
  onUpdateQty: (item: CartItem, qty: number) => void
  onPressImage: (item: CartItem) => void
}

export type NumberInput = {
  initialValue: number
  onChange: (value: number) => void
  size?: sizes
}

export type ChipsProps = {
  title: string
  bgColor?: string
  color?: string
  isActive?: boolean
  activeBgColor?: string
  activeColor?: string
  onPress?: () => void
  size?: sizes
}

export type CartIndicatorProps = {
  size?: string
  bgColor?: string
  color?: string
}

export type NumberInputProps = {
  initialValue?: number
  onChange: (qty: number) => void
  size?: sizes
}

export type VividCardProps = {
  title: string
  subtitleLine1: string
  subtitleLine2: string
  button: {
    title: string
    href: string
  }
  bgImgUri?: string
  color?: string
}