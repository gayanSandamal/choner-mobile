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
  children?: React.ReactNode
  classNames?: string
}

export type BtnLinkProps = {
  href: string
  label?: string
  color?: string
}

export enum InputSizes {
  'xs',
  'sm',
  'md',
  'lg'
}

export type InputSize = InputSizes.xs | InputSizes.sm | InputSizes.md | InputSizes.lg

type ButtonProps = {
  bgColor?: string
  color?: string
  icon?: IconName
  id?: string | number
  onPress?: (data?: any) => void
  link?: string
  size?: InputSize
  children?: React.ReactNode
}

export type CharmBtnProps = {
  frame?: boolean
} & ButtonProps

export type BtnProps = {
  label?: string
  iconColor?: string
  disabled?: boolean
  wrapperClasses?: string
  outlined?: boolean
  iconWidth?: number
  iconHeight?: number
  block?: boolean
  textMode?: boolean
} & ButtonProps

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
  FLabel = 14,
  FP = 12,
  FSmall = 10
}

export enum FontTypes {
  FDisplay1 = 'h1',
  FDisplay2 = 'h2',
  FDisplay3 = 'h3',
  FDisplay4 = 'h4',
  FDisplay5 = 'h5',
  FDisplay6 = 'h6',
  FTitle1 = 'title1',
  FTitle1Bold = 'title1-bold',
  FTitle2 = 'title2',
  FTitle3 = 'title3',
  FTitle3Bold = 'title3-bold',
  FLabel = 'label',
  FP = 'p',
  FSmall = 'small'
}

export type FontType = FontTypes.FDisplay1 | FontTypes.FDisplay2 | FontTypes.FDisplay3 | FontTypes.FDisplay4 | FontTypes.FDisplay5 | FontTypes.FDisplay6 | FontTypes.FTitle1 | FontTypes.FTitle1Bold | FontTypes.FTitle2 | FontTypes.FTitle3 | FontTypes.FTitle3Bold | FontTypes.FLabel | FontTypes.FP | FontTypes.FSmall

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
  containerStyles?: ContainerStyles
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
  numberOfLines?: number
}

export enum IconNames {
  'bell',
  'insight',
  'handshake',
  'interests',
  'interestsFill',
  'play',
  'trophy',
  'search',
  'fist',
  'biceps',
  'addPost',
  'qanda',
  'close',
  'send',
  'options',
  'login',
  'register',
  'chevronLeft',
  'email',
  'password',
  'apple',
  'google',
  'facebook',
  'view',
  'hidden'
}

export type IconName = IconNames.bell | IconNames.insight | IconNames.handshake | IconNames.interests | IconNames.interestsFill | IconNames.play | IconNames.trophy | IconNames.search | IconNames.fist | IconNames.biceps | IconNames.addPost | IconNames.qanda | IconNames.close | IconNames.send | IconNames.options | IconNames.login | IconNames.register | IconNames.chevronLeft | IconNames.email | IconNames.password | IconNames.apple | IconNames.google | IconNames.facebook | IconNames.view | IconNames.hidden

export type IconProps = {
  color?: string,
  name: IconName,
  size?: InputSize,
  width?: number
  height?: number
}

export type IndicatorProps = {
  color?: string
  children?: React.ReactNode
}

export type HeaderProps = {
  unreadNotifications?: boolean
}

type ContainerStyles = { [key: string]: string | number }

export type AvatarProps = {
  containerStyles?: ContainerStyles
  bgColor?: string
  img?: string
  size?: InputSize
}

type BaseGridDimensions = {
  width: number
  height: number
}

export type GridItemProps = {
  columns?: number
  gridDimentions?: BaseGridDimensions
  classNames?: string
  containerStyles?: ContainerStyles
  children?: React.ReactNode
}

export type BaseGridProps = {
  children?: React.ReactNode
  containerStyles?: ContainerStyles
  classNames?: string
  onFetchDimensions?: (dimensoins: BaseGridDimensions) => void
}

type Gradient = {
  colorBase: string
  colorSecondary: string
}

export type CardProps = {
  borderColor?: Gradient
  backgroundColor?: Gradient
  children?: React.ReactNode
  classNames?: string
  containerStyles?: ContainerStyles
  gap?: boolean
}

export type SpacerProps = {
  height?: number
}

export type ActionBarProps = {
  active?: boolean
  onPress?: () => void
  title?: string
}

export type PostTypesProps = {
  list?: PostTypeProps[]
  onPress: (item: PostTypeProps) => void
  onClosePress?: () => void
}
export type PostProps = {
  list?: PostTypeProps[]
  actionBarData?: ActionBarProps
  publishPostData?: PublishPostProps
  onPostTypePress: (item: PostTypeProps) => void
}
export type PublishPostProps = {
  icon?: IconName
  title?: string
  placeholder?: string
  enableScheduling?: boolean
  onCancelPublish?: () => void
  onPublish?: (content: string) => void
  cancelButtonProps?: BtnProps
  submitButtonProps?: BtnProps
}

export type PostTypeProps = {
  subtitle?: string
} & PublishPostProps

export type Circle = {
  id: number,
  imageUri?: string,
  title: string,
  unreadCount: number
}

export type PostedByProps = {
  name: string
  postedDate: string
  img?: string
}

export type InterestCardProps = {
  id: number
  title: string
  subtitle: string
  postedBy: PostedByProps
  interestedCount: number
}

export type SignUpScreenProps = {
  onSetActiveScreen: (screen: string) => void
}

export type InputType = 'text' | 'numeric'

export type InputProps = {
  containerStyles?: ContainerStyles
  classNames?: string
  size?: InputSize
  value?: string
  placeholder?: string
  type?: InputType
  icon?: IconName
  iconRight?: IconName
  secureTextEntry?: boolean
  onChange?: (text: string) => void
  onPressIconRight?: (show: boolean) => void
}

export type SeparatorProps = {
  label?: string
  barWidth?: number
}