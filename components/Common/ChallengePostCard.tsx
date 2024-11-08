import { View, StyleSheet, ScrollView } from "react-native"
import { PostUserItem } from "./PostUserItem"
import Label from "../Base/Label"
import { ChallengePostCardProps, ChallengePostCategory, ChallengeState, FontTypes, IconNames, InputSizes, UserChallengeStatus } from "@/types/Components"
import Icon from "../Base/Icon"
import { postCreateTimeToDate } from "@/utils/commonUtils"
import { Btn } from "../Base/Button"
import { Colors } from "@/constants/Colors"
import { peopleCountOption } from "@/constants/values"
import { useToggleUserChallengeStatus } from "@/hooks/mutate/useMutateChallengePosts"

const styles = StyleSheet.create({
    wrapper: { borderWidth: 1, borderRadius: 20, borderColor: Colors.dark.main, width: '100%', backgroundColor: Colors.dark.darkText },
    titleDivider: { width: 1, height: '100%', backgroundColor: Colors.dark["grey-shade-3"], marginLeft: 2, marginRight: 10 },
    bottomItemsWrapper: { flexDirection: 'row' },
    infoItem: { backgroundColor: Colors.dark["primary-material-1"] + '2A', overflow: "hidden", height: 33, borderRadius: 10 }
})

type ChallengePostCardTypes = { item: ChallengePostCardProps, uid: string}

export const ChallengePostCard = ({item, uid}: ChallengePostCardTypes) => {
    const {mutate: toggleJoin, isPending: toggleJoining} = useToggleUserChallengeStatus(() => {}, (data) => {})
    
    const isScheduled = item.challengeState === ChallengeState.SCHEDULED
    const isOngoing = item.challengeState === ChallengeState.ONGOING
    const isEnded = item.challengeState === ChallengeState.ENDED
    const showJoinButton = item.participantStatus === UserChallengeStatus.NOT_JOINED
    const showRequestButton = item.participantStatus === UserChallengeStatus.PENDING_REQUEST
    const isLimitReached = item.participantLimitReached

    const onPressJoin = () => toggleJoin({uid: uid, challengeId: item.id})

    // const navigateToInterest = () => {
    //     if (showOptionInterest === data.id) {
    //       setShowOptionInterest && setShowOptionInterest('')
    //       return
    //     }
      
    //     !disabled && router.push({
    //       pathname: navigationPath || '/interests/interest-view',
    //       params: {
    //         data: JSON.stringify({
    //           isOwner,
    //           id: data.id,
    //           title: data.title,
    //           description: data.description,
    //           createdBy: {
    //             ...data.createdBy,
    //             profileImageUrl: escapePercent(data?.createdBy?.profileImageUrl || '')
    //           },
    //           createdAt: data.createdAt,
    //           scheduledAt: data.scheduledAt,
    //           visibility: data.visibility,
    //           voteCount: data.voteCount,
    //         })
    //       },
    //     })
        
    //     setShowOptionInterest && setShowOptionInterest('')
    //   }

    return (
        <View className="py-[16px] pl-[16px]" style={{...styles.wrapper, ...(isOngoing && {borderColor: Colors.dark["green-shade-1"]})}}>

            <View className="flex flex-row items-center">
                <PostUserItem imageUrl={item.createdBy?.profileImageUrl} userName={item.createdBy.displayName} width="w-[80px]" createdAt={item.createdAt} dateProps={{ clipeDate: true }} />
                <View style={styles.titleDivider} />
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Label type={FontTypes.FTitle3Bold} color={Colors.light.white} label={item.description} ellipsizeMode="tail" numberOfLines={1} />
                </View>
            </View>

            <View className="flex flex-row items-center mt-4 pr-3 w-full">
                <Icon name={IconNames.location} color={Colors.light.white} classNames="mr-3" />
                <Label classNames="mr-6" containerStyles={{ fontSize: 16, fontWeight: 400 }} color={Colors.light.white} label={item.location?.name || ''} ellipsizeMode="tail" numberOfLines={2} />
            </View>

            <View className="flex flex-row items-center mt-4 pr-3 w-full">
                {isScheduled && (
                    <>
                        <Icon name={IconNames.trophy} color={Colors.dark["primary-material-1"]} classNames="mr-3" />
                        <Label classNames="mr-6" containerStyles={{ fontSize: 16, fontWeight: 400 }} color={Colors.light.white} label={`Challenge starts at ${postCreateTimeToDate(item.challengeAt)}`} ellipsizeMode="tail" numberOfLines={2} />
                    </>
                )}
                {isOngoing && (
                    <>
                        <Icon name={IconNames.active} color={Colors.dark["green-shade-1"]} classNames="mr-3" />
                        <Label classNames="mr-6" containerStyles={{ fontSize: 16, fontWeight: 400 }} color={Colors.light.white} label={`Challenge has started`} ellipsizeMode="tail" numberOfLines={1} />
                    </>
                )}
                {isEnded && (
                    <>
                        <Icon name={IconNames.trophy} color={Colors.dark["grey-shade-2"]} classNames="mr-3" />
                        <Label classNames="mr-6" containerStyles={{ fontSize: 16, fontWeight: 400 }} color={Colors.light.white} label={`Challenge has ended`} ellipsizeMode="tail" numberOfLines={1} />
                    </>
                )}
            </View>

            <View className="mt-5" style={styles.bottomItemsWrapper}>
                {uid!== item.createdBy.uid && (
                    <View className="flex-row">
                        {showJoinButton && <Btn isLoading={toggleJoining} disabled={toggleJoining || isLimitReached} size={InputSizes.md} backgroundColor={isLimitReached? Colors.dark.disabled: undefined} fontType={FontTypes.FLabelBold} label={'JOIN'} icon={IconNames.join} onPress={onPressJoin} />}
                        {(!showJoinButton || showRequestButton) && <Btn isLoading={false} disabled={true} size={InputSizes.md} fontType={FontTypes.FLabelBold} backgroundColor={Colors.dark.disabled} label={showRequestButton? 'REQUESTED': 'JOINED'} icon={IconNames.join} onPress={() => { }} />}
                        <View className="mr-3" />
                    </View>
                )}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems: 'center'}}>
                    <View className="flex flex-row items-center px-[10px]" style={styles.infoItem}>
                        <Icon name={item.type === ChallengePostCategory.VIRTUAL ? IconNames.virtual : IconNames.onLocation} color={Colors.dark["primary-material-1"]} classNames="mr-1.5" />
                        <Label containerStyles={{ fontSize: 16, fontWeight: 400 }} color={Colors.dark["primary-material-1"]} label={item.type === ChallengePostCategory.VIRTUAL ? 'Virtual' : 'On Location'} ellipsizeMode="tail" numberOfLines={1} />
                    </View>
                    {item?.participationRangeId && (
                        <>
                            <View className="mr-3" />
                            <View className="flex flex-row items-center px-[10px]" style={{...styles.infoItem, ...(item?.participantLimitReached && {backgroundColor: Colors.dark["grey-shade-3"] + '2A'})}}>
                                <Label containerStyles={{ fontSize: 16, fontWeight: 400 }} color={isLimitReached? Colors.dark["grey-shade-2"] : Colors.dark["primary-material-1"]} label={peopleCountOption[(item.participationRangeId - 1)].label + (isLimitReached? ' (Maxed)': '')} ellipsizeMode="tail" numberOfLines={1} />
                            </View>
                            <View className="mr-3" />
                        </>
                    )}
                </ScrollView>
            </View>

        </View>
    )
}