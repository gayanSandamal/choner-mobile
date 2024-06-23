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

export enum InputSizes {
  'sm',
  'md',
  'lg'
}

export type CharmBtnSize = InputSizes.sm | InputSizes.md | InputSizes.lg

export type CharmBtnProps = {
  color?: string
  onPress: () => void
  icon?: IconName
  frame?: boolean
  size?: CharmBtnSize
  slot?: React.ReactNode
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

export enum FontSizes {
  FTitle1 = 20,
  FTitle2 = 16
}

export enum FontTypes {
  FTitle1 = 'title1',
  FTitle2 = 'title2',
  FLabel = 'label',
  FP = 'p'
}

export type FontType = FontTypes.FTitle1 | FontTypes.FTitle2 | FontTypes.FLabel | FontTypes.FP

export enum FontColors {
  'light' = 'light',
  'dark' = 'dark'
}

export type FontColor = FontColors.light | FontColors.dark | string

export type LabelProps = {
  type: FontType
  color?: FontColor
  classNames?: string
  label?: string
}

export type IconSize = InputSizes.sm | InputSizes.md | InputSizes.lg

export enum IconNames {
  'bell',
  'insight',
  'handshake',
  'interests',
  'play',
  'trophy'
}

export type IconName = IconNames.bell | IconNames.insight

export type IconProps = {
  color?: string,
  name: IconName,
  size?: IconSize
}

export type IndicatorProps = {
  color?: string
}

export type HeaderProps = {
  unreadNotifications?: boolean
}