import { DimensionValue, ImageStyle, StyleProp, TextInput, ViewStyle } from "react-native"
import { CartItem } from "./Products"
import { User } from "./User"

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
  isLoading?: boolean,
  labelAlign?: JustifyContent.center | JustifyContent.left | JustifyContent.right
  fontType?: FontTypes
  labelColor?: string
  disabled?: boolean
  leftIcon?: {name: string, size?: number, color?: string, viewbox?: string, classNames?: string},
  rightIcon?: {name: string, size?: number, color?: string, viewbox?: string, classNames?: string},
  wrapperStyle?: ViewStyle
  labelStyle?: ContainerStyles
  loaderSize?: number
  onPress: () => void
}

export enum InputSizes {
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'tab'
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
  classNames?: string
  wrapperClasses?: string
  outlined?: boolean
  iconWidth?: number
  iconHeight?: number
  block?: boolean
  textMode?: boolean
  backgroundColor?: string
  style?: StyleProp<ViewStyle>
  isLoading?: boolean
  fontStyle?: ContainerStyles
  fontType?: FontType
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
  chevronMiniLeft = 'chevronMiniLeft',
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
  addCircle = 'addCircle',
  report = 'report',
  image = 'image',
  timer = 'timer',
  plus = 'plus',
  bicepsFilled = 'bicepsFilled',
  xp = 'xp',
  reward = 'reward',
  planet = 'planet',
  badge = 'badge',
  virtual = 'virtual',
  onLocation = 'onLocation',
  exclamation = 'exclamation',
  location = 'location',
  join = 'join',
  active = 'active',
  circleCheck = 'circleCheck',
  survey = 'survey'
}

export enum PostType {
  interest = 'interest',
  community = 'community',
  challenge = 'challenge'
}

export enum PostVisibility {
  scheduled = "scheduled",
  public = "public"
}

export enum CommentType {
  COMMENT = 'COMMENT',
  REPLY = 'REPLY',
  UPDATE = 'UPDATE'
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

export type PostBottomActionsProps = {
  isScheduled: boolean
  dateTime: Date | null
  showDatePicker: boolean
  isPostPublishable: boolean
  isLoading: boolean
  postTypeUpdate: boolean
  onPressMutate: () => void
  handleConfirm: (date: Date) => void
  hideDatePicker: () => void
  setShowDatePicker: (state: boolean) => void
  setIsScheduled: (state: boolean) => void
}

export type PostWrapperComponentProps = {
  children: React.ReactNode
  actionBarData?: ActionBarProps
  postHeaderData?: PostHeaderProps
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

export type CommunityPostTypeModalProps = {
  showModal: boolean
  postParams?: CommunityPostParams
  setShowModal: (show: boolean) => void
}

export type PostModalProps = {
  postType: PostType
  showModal: boolean
  postHeaderData?: PostHeaderProps
  actionBarData?: ActionBarProps
  postParams?: InterestPostParams | CommunityPostParams | ChallengePostParams
  onCancel: () => void
  onSuccess?: (data: CommunityCardData) => void
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
  scheduledAt: {_nanoseconds: number, _seconds: number} | undefined
  visibility: "public" | "scheduled"
}

export enum CommunityPostCategory {
  POST = 'post',
  QUESTION = 'question',
}

export type CommunityPostParams = {
  id: string
  imageUrls: ImageSizes
  title: string
  type: CommunityPostCategory.POST | CommunityPostCategory.QUESTION
  scheduledAt: {_nanoseconds: number, _seconds: number}  | undefined
  visibility: "public" | "scheduled"
}

export enum ChallengePostCategory {
  VIRTUAL = 'virtual',
  ON_LOCATION = 'on-locaion'
}

export type ChallengePostParams = {
  id: string
  title: string
  type: ChallengePostCategory.VIRTUAL | ChallengePostCategory.ON_LOCATION
  challengeAt: {_nanoseconds: number, _seconds: number}  | undefined
  participation: string
  location?: string
  allowAnyone?: boolean
}

export type SelectedCommentParams = {
  commentId: string
  replyId?: string
}

export type PublishInterestPostProps = {
  edit?: boolean
  postParams?: InterestPostParams
  postHeaderData?: PostHeaderProps
  actionBarData?: ActionBarProps
  onSuccess: () => void
}

export type PublishCommunityPostProps = {
  edit?: boolean
  postParams?: CommunityPostParams
  actionBarData?: ActionBarProps
  onSuccess: (data: CommunityCardData) => void
  onClose: (close: boolean) => void
}

export type PublishChallengePostProps = {
  edit?: boolean
  postParams?: ChallengePostParams
  postHeaderData?: PostHeaderProps
  actionBarData?: ActionBarProps
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

export type CreatedAt = {
  _seconds: number,
  _nanoseconds: number
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
  scheduledAt: {_nanoseconds: number, _seconds: number} | undefined
  visibility: "public" | "scheduled"
  voteCount: number
  isOwner?: boolean
}

export type ImageSizes = {
  sm?: string,
  md?: string,
  lg?: string
}


export type CommentData = {
  id: string
  postId: string
  comment: string
  createdUser:{
    uid: string,
    displayName: string,
    profileImageUrl?: string
  }
  createdAt:{
    _seconds: number,
    _nanoseconds: number
  }
  isOwner?: boolean
}

export type ReplyData = {
  id: string
  commentId: string
  reply: string
  createdUser:{
    uid: string,
    displayName: string,
    profileImageUrl?: string
  }
  createdAt:{
    _seconds: number,
    _nanoseconds: number
  }
  isOwner?: boolean
}

export type CommunityCardData = {
  id: string
  title: string
  type: string
  imageUrls: ImageSizes
  createdUser:{
    uid: string,
    displayName: string,
    profileImageUrl?: string
  }
  createdAt:{
    _seconds: number,
    _nanoseconds: number
  }
  scheduledAt: {_nanoseconds: number, _seconds: number} | undefined
  visibility: "public" | "scheduled"
  voteCount: number
  isOwner?: boolean
}

export type ChallengeCardData = {
  id: string
  description: string
  type: string
  createdUser:{
    uid: string,
    displayName: string,
    profileImageUrl?: string
  }
  createdAt:{
    _seconds: number,
    _nanoseconds: number
  }
  challengedAt: {_nanoseconds: number, _seconds: number} | undefined
  joinedCount?: number
  participation: string
  location?: string
  allowAnyone?: boolean
  isOwner?: boolean
}

export type PostUserItemProps = {
  userName: string
  createdAt?: {
      _seconds: number
      _nanoseconds: number
  }
  imageUrl?: string
  classNames?: string
  width?: string
  useRNImage?: boolean
  stylesForINimage?: ImageStyle
  fullWidth?: boolean
  dateProps?: {
    newLineDate?: boolean
    clipeDate?: boolean
  }
}

export type InterestCardProps = {
  data: InterestCardData
  scheduled?: boolean
  showOptionInterest?: string
  disabled?: boolean
  classNames?: string
  navigationPath?: string
  isOwner?: boolean
  onOptionPress: () => void
  onDelete?: () => void
  setShowOptionInterest?: (show: string) => void
}

export type CommunityListProps = {
  uid: string
  communityPostList1: any
  communityPostList2: any
  navigationPath?: string
  scheduled?: boolean
}

export type CommunityPostCardProps = {
  data: CommunityCardData
  title: string
  createdUser: {
      displayName: string
      profileImageUrl?: string
  }
  createdAt: {
      _seconds: number
      _nanoseconds: number
  } | undefined
  scheduled?: boolean
  image?: string
  isOwner?: boolean
  navigationPath?: string
}

export enum ChallengeState {
  SCHEDULED = 'scheduled',
  ONGOING = 'ongoing',
  ENDED = 'ended'
}

export enum UserChallengeStatus {
  NOT_JOINED = 'not-joined',
  PENDING_REQUEST = 'pending-request',
  JOINED = 'joined',
  COMPLETED = 'completed',
  NOT_COMPLETED = 'not-completed',
  PENDING_COMPLETE_CONFIRM = 'pending-complete-confirm',
  COMPLETE_CONFIRMED = 'complete-confirmed'
}
 
export type ChallengePostCardProps = {
  id: string,
  participantStatus: UserChallengeStatus.NOT_JOINED | UserChallengeStatus.PENDING_REQUEST | UserChallengeStatus.JOINED | UserChallengeStatus.COMPLETED | UserChallengeStatus.NOT_COMPLETED | UserChallengeStatus.PENDING_COMPLETE_CONFIRM | UserChallengeStatus.COMPLETE_CONFIRMED,
  challengeState: ChallengeState.SCHEDULED | ChallengeState.ONGOING | ChallengeState.ENDED,
  type: string,
  participationRangeId: number,
  description: string,
  location: string,
  createdAt: {
      _nanoseconds: number,
      _seconds: number,
  },
  challengeAt: {
      _nanoseconds: number,
      _seconds: number,
  },
  createdUser: {
      uid: string,
      displayName: string,
      profileImageUrl?: string
  }
  participantLimitReached?: boolean
}

export type PostOptionsProps = {
  show: boolean
  isOwner: boolean
  postVisibility: string
  bottom?: number
  right?: number
  onUpdate: () => void
  onDelete: () => void
}

export type ChatListProps = {
  comments: any
  uid: string
  postCreatedUserId: string
  idFetching: boolean
  commentText: string
  addingComment: boolean
  user: User | null
  postType: string
  setCommentText: (text: string) => void
  onAddComment: () => void
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
  iconColor?: string
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
  ref?: React.LegacyRef<TextInput> | undefined
  disabled?: boolean
  maxCharacters?: number
  maxLines?: number
  height?: DimensionValue
  disableNewLine?: boolean
  clasName?: string
  hideTab? : boolean
  autoFocus?: boolean
  styles?: ViewStyle
  onChangeText: (text: string) => void
}

export type CommentInputProps = {
  user: User | null
  text: string
  isDisabled: boolean
  isUpdating: boolean
  commentType: 'COMMENT' | 'REPLY' | 'UPDATE'
  headerText?: string
  placeholder?: string
  hideUser?: boolean
  onTextChange: (text: string) => void
  onSubmit: () => void
  onCancelUpdate: () => void
}

export type UploadImage = {
  uri?: string
  name?: string
  type?: string
  blob?: Blob
}

export type SurveyPageData = {
  id: string
  description: string
  options: { id: string, description: string }[]
  type: {
    multiSelect?: boolean
    textMultiline?: boolean
  }
}

export type CompletedForm = {
  pageId: string
  optionIds?: string[]
}

export type SurveyData = {
  title: string
  completedForms: CompletedForm[]
  pages: SurveyPageData[]
}
