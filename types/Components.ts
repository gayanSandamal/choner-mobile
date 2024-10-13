import { DimensionValue, StyleProp, ViewStyle } from "react-native"
import { CartItem } from "./Products"

type sizes = 'sm' | 'md' | 'lg'

type TabMeta = {
  search?: boolean
}

export type TabType = {
  name: string,
  title: string,
  icon: {
    name: string,
    link: string
  },
  meta?: TabMeta
}

export type SectionLink = {
  title: string
  href: string
  color?: string
}

export type MainWrapperProps = {
  children: React.ReactNode
}

export type SettignsWrapperProps = {
  children: React.ReactNode
  header: string
  rightIcon?: IconNames
  onPressRightIcon?: () => void
  onBack?: () => void
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

export type BtnDetailedProps = {
  label: string,
  labelAlign?: JustifyContent.center | JustifyContent.left | JustifyContent.right
  fontType?: FontTypes
  labelColor?: string
  disabled?: boolean
  leftIcon?: {name: string, size?: number, color?: string, viewbox?: string, classNames?: string},
  rightIcon?: {name: string, size?: number, color?: string, viewbox?: string, classNames?: string},
  wrapperStyle?: ViewStyle
  leftIconStyle?: ViewStyle
  centerIconStyle?: ViewStyle
  rightIconStyle?: ViewStyle
  onPress: () => void
}

export enum InputSizes {
  'xs',
  'sm',
  'md',
  'lg',
  'xl'
}

export enum JustifyContent {
  'center',
  'left',
  'right'
}

export type InputSize = InputSizes.xs | InputSizes.sm | InputSizes.md | InputSizes.lg | InputSizes.xl

type ButtonProps = {
  bgColor?: string
  color?: string
  icon?: string
  id?: string | number
  onPress?: (data?: any) => void
  link?: string
  size?: InputSize
  children?: React.ReactNode
}

export interface CharmBtnProps extends BtnProps{
  frame?: boolean,
  clear?: boolean,
}

export type BtnProps = {
  label?: string
  iconColor?: string
  disabled?: boolean
  className?: string
  wrapperClasses?: string
  outlined?: boolean
  iconWidth?: number
  iconHeight?: number
  block?: boolean
  textMode?: boolean
  backgroundColor?: string
  style?: StyleProp<ViewStyle>
  isLoading?: boolean
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

export type ModalProps = {
  showModal: boolean
  children: React.ReactNode
  customModal?: boolean
  setShowModal: (show: boolean) => void
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

export type CheckBoxProps = {
  isChecked: boolean
  classNames?: string
  size?: InputSize
  disabled?: boolean
  onPress: (checked: boolean) => void
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
  FSmall = 10,
  FSmallest = 9.5
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
  FLabelBold = 'label-bold',
  FP = 'p',
  FSmall = 'small',
  FSmallest = 'FSmallest'
}

export type FontType = FontTypes.FDisplay1 | FontTypes.FDisplay2 | FontTypes.FDisplay3 | FontTypes.FDisplay4 | FontTypes.FDisplay5 | FontTypes.FDisplay6 | FontTypes.FTitle1 | FontTypes.FTitle1Bold | FontTypes.FTitle2 | FontTypes.FTitle3 | FontTypes.FTitle3Bold | FontTypes.FLabel | FontTypes.FP | FontTypes.FSmall | FontTypes.FLabelBold | FontTypes.FSmallest

export enum FontColors {
  'light' = 'light',
  'dark' = 'dark'
}

export type FontColor = FontColors.light | FontColors.dark | string

export type LabelProps = {
  type?: FontType
  color?: FontColor
  classNames?: string
  underline?: boolean
  label?: string
  containerStyles?: ContainerStyles
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'
  numberOfLines?: number
}

export enum IconNames {
  bell = 'bell',
  insight = 'insight',
  handshake = 'handshake',
  interests = 'interests',
  interestsFill = 'interestsFill',
  play = 'play',
  trophy = 'trophy',
  search = 'search',
  fist = 'fist',
  biceps = 'biceps',
  addPost = 'addPost',
  qanda = 'qanda',
  close = 'close',
  send = 'send',
  options = 'options',
  login = 'login',
  register = 'register',
  chevronLeft = 'chevronLeft',
  email = 'email',
  password = 'password',
  apple = 'apple',
  google = 'google',
  facebook = 'facebook',
  view = 'view',
  hidden = 'hidden',
  info = 'info',
  person = 'person',
  incognito = 'incognito',
  lock = 'lock',
  personAdd = 'personAdd',
  chevronMiniRight = 'chevronMiniRight',
  save = 'save',
  down = 'down',
  camera = 'camera',
  gallery = 'gallery',
  cancel = 'cancel',
  delete = 'delete',
  logout = 'logout',
  settings = 'settings',
  editPencil = 'editPencil',
  checkBox = 'checkBox',
  checkCircle = 'checkCircle',
  addCircle = 'addCircle'
}

export enum PostType {
  interest = 'interest',
  community = 'community'
}

export enum PostVisibility {
  scheduled = "scheduled",
  public = "public"
}

export type IconProps = {
  color?: string
  name: string
  classNames?: string
  viewBox?: string
  size?: InputSize
  width?: number
  height?: number
}

export type IndicatorProps = {
  color?: string
  children?: React.ReactNode
}

export type HeaderProps = {
  unreadNotifications?: boolean
  onPressAvatar?: () => void
}

type ContainerStyles = { [key: string]: string | number }

export type AvatarProps = {
  containerStyles?: ViewStyle
  bgColor?: string
  img?: string
  size?: InputSize
  onPressAvatar?: () => void
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
  width?: number
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


export type PostWrapperComponentProps = {
  postHeaderData: PostHeaderProps
  children: React.ReactNode
  actionBarData?: ActionBarProps
  onCancel: () => void
}

export type PostProps = {
  postType: PostType.community | PostType.interest
  postHeaderData: PostHeaderProps
  list?: PostTypeProps[]
  showModal?: boolean
  actionBarData?: ActionBarProps
  postParams?: InterestPostParams
  onPostTypePress: (item: PostTypeProps) => void
}

export type PostModalProps = {
  postType: PostType
  showModal: boolean
  postHeaderData: PostHeaderProps
  actionBarData?: ActionBarProps
  postParams?: InterestPostParams
  onCancel: () => void
  setShowModal: (show: boolean) => void
}

export type PostHeaderProps = {
  icon: string
  title: string
  onCancel?: () => void
}

export type PostTypeProps = {
  subtitle?: string
} & PostHeaderProps

export type InterestPostParams = {
  id: string
  interest: string
  interestDesc: string
  scheduledAt: {_nanoseconds: number, _seconds: number}
  visibility: "public" | "scheduled"
}

export type PublishInterestPostProps = {
  edit?: boolean
  postParams?: InterestPostParams
  onSuccess: () => void
}

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

export type InterestCardData = {
  id: string
  title: string
  description: string
  createdUser:{
    uid: string,
    displayName: string,
    profileImageUrl?: string
  }
  createdAt:{
    _seconds: number,
    _nanoseconds: number
  }
  scheduledAt: {_nanoseconds: number, _seconds: number}
  visibility: "public" | "scheduled"
  voteCount: number
  isOwner?: boolean
}

export type InterestCardProps = {
  data: InterestCardData
  showOptionInterest?: string
  disabled?: boolean
  classNames?: string
  navigationPath?: string
  isOwner?: boolean
  onOptionPress: () => void
  onDelete?: () => void
  setShowOptionInterest?: (show: string) => void
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
  fontSize?: FontSizes
  icon?: string
  iconRight?: string
  secureTextEntry?: boolean
  onChange?: (text: string) => void
  onPressIconRight?: (show: boolean) => void
}

export type SeparatorProps = {
  label?: string
  barWidth?: number
}

export type TextAreaProps = {
  value: string
  placeHolder: string
  disabled?: boolean
  maxCharacters?: number
  maxLines?: number
  height?: DimensionValue
  disableNewLine?: boolean
  clasName?: string
  onChangeText: (text: string) => void
}

export type UploadImage = {
  uri?: string
  name?: string
  type?: string
  blob?: Blob
}