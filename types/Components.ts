import { CartItem } from "./Products"

type sizes = 'sm' | 'md' | 'lg'

type TabMeta = {
  search?: boolean
}

export type TabType = {
  name: string,
  title: string,
  icon: {
    name: IconName,
    link: string
  },
  meta?: TabMeta
}

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
  containerStyles?: ContainerStyles
  classNames?: string
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

export type InputSize = InputSizes.sm | InputSizes.md | InputSizes.lg

export type CharmBtnProps = {
  color?: string
  onPress: () => void
  icon?: IconName
  frame?: boolean
  size?: InputSize
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
  FDisplay1 = 44,
  FDisplay2 = 32,
  FDisplay3 = 28,
  FDisplay4 = 26,
  FDisplay5 = 24,
  FDisplay6 = 22,
  FTitle1 = 20,
  FTitle2 = 18,
  FTitle3 = 16,
  FP = 12
}

export enum FontTypes {
  FDisplay1 = 'h1',
  FDisplay2 = 'h2',
  FDisplay3 = 'h3',
  FDisplay4 = 'h4',
  FDisplay5 = 'h5',
  FDisplay6 = 'h6',
  FTitle1 = 'title1',
  FTitle2 = 'title2',
  FTitle3 = 'title3',
  FTitle3Bold = 'title3-bold',
  FLabel = 'label',
  FP = 'p'
}

export type FontType = FontTypes.FDisplay1 | FontTypes.FDisplay2 | FontTypes.FDisplay3 | FontTypes.FDisplay4 | FontTypes.FDisplay5 | FontTypes.FDisplay6 | FontTypes.FTitle1 | FontTypes.FTitle2 | FontTypes.FTitle3 | FontTypes.FTitle3Bold | FontTypes.FLabel | FontTypes.FP

export enum FontColors {
  'light' = 'light',
  'dark' = 'dark'
}

export type FontColor = FontColors.light | FontColors.dark | string

export type LabelProps = {
  type?: FontType
  color?: FontColor
  classNames?: string
  label?: string
}

export enum IconNames {
  'bell',
  'insight',
  'handshake',
  'interests',
  'play',
  'trophy',
  'search'
}

export type IconName = IconNames.bell | IconNames.insight | IconNames.handshake | IconNames.interests | IconNames.play | IconNames.trophy | IconNames.search

export type IconProps = {
  color?: string,
  name: IconName,
  size?: InputSize
}

export type IndicatorProps = {
  color?: string
}

export type HeaderProps = {
  unreadNotifications?: boolean
}

type ContainerStyles = { [key: string]: string | number }

export type AvatarProps = {
  containerStyles?: ContainerStyles
  img?: string
  size?: InputSize
}