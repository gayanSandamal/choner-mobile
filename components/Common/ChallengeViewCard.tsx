import { View, StyleSheet, ScrollView } from "react-native"
import { PostUserItem } from "./PostUserItem"
import Label from "../Base/Label"
import { ChallengePostCardProps, ChallengePostCategory, ChallengeState, FontTypes, IconNames, InputSizes, UserChallengeStatus } from "@/types/Components"
import Icon from "../Base/Icon"
import { postCreateTimeToDate } from "@/utils/commonUtils"
import { Btn, CharmBtn } from "../Base/Button"
import { Colors } from "@/constants/Colors"
import { peopleCountOption } from "@/constants/values"
import { useToggleUserChallengeStatus } from "@/hooks/mutate/useMutateChallengePosts"

const styles = StyleSheet.create({
    wrapper: { borderWidth: 1, borderRadius: 20, borderColor: Colors.dark.main, width: '100%', backgroundColor: Colors.dark.darkText },
    titleDivider: { width: 1, height: '100%', backgroundColor: Colors.dark["grey-shade-3"], marginLeft: 2, marginRight: 10 },
    bottomItemsWrapper: { flexDirection: 'row' },
    infoItem: { backgroundColor: Colors.dark["primary-material-1"] + '2A', overflow: "hidden", height: 33, borderRadius: 10 }
})

type ChallengeViewCardTypes = { item: ChallengePostCardProps, uid: string, onPressOptions: () => void}

export const ChallengeViewCard = ({item, uid, onPressOptions}: ChallengeViewCardTypes) => {
    const {mutate: toggleJoin, isPending: toggleJoining} = useToggleUserChallengeStatus(() => {}, () => {})
    
    const isScheduled = item.challengeState === ChallengeState.SCHEDULED
    const isOngoing = item.challengeState === ChallengeState.ONGOING
    const isEnded = item.challengeState === ChallengeState.ENDED
    const showJoinButton = item.participantStatus === UserChallengeStatus.NOT_JOINED
    const showRequestButton = item.participantStatus === UserChallengeStatus.PENDING_REQUEST
    const isLimitReached = item.participantLimitReached

    const onPressJoin = () => toggleJoin({uid: uid, challengeId: item.id})

    return (
        <View className="py-[16px] px-[14px]" style={{...styles.wrapper, ...(isOngoing && {borderColor: Colors.dark["green-shade-1"]})}}>

            <View className="flex flex-row items-center justify-between">
                <PostUserItem imageUrl={item.createdBy?.profileImageUrl} fontType={FontTypes.FLabel} userName={item.createdBy.displayName} width="w-[80%]" createdAt={item.createdAt} dateProps={{ clipeDate: true }} />
                <CharmBtn classNames="mr-[-10px] mt-[-10px]" icon={IconNames.options} onPress={onPressOptions} size={InputSizes.md} frame={false} />
            </View>

            <Label classNames="mt-3" type={FontTypes.FLabel} color={Colors.light.white} label={item.description} ellipsizeMode="tail" />

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

            {uid!== item.createdBy.uid && (
                <View className="mt-5 flex-row">
                    {showJoinButton && <Btn isLoading={toggleJoining} disabled={toggleJoining || isLimitReached} size={InputSizes.md} backgroundColor={isLimitReached? Colors.dark.disabled: undefined} fontType={FontTypes.FLabelBold} label={'JOIN'} icon={IconNames.join} onPress={onPressJoin} />}
                    {(!showJoinButton || showRequestButton) && <Btn isLoading={false} disabled={true} size={InputSizes.md} fontType={FontTypes.FLabelBold} backgroundColor={Colors.dark.disabled} label={showRequestButton? 'REQUESTED': 'JOINED'} icon={IconNames.join} onPress={() => { }} />}
                </View>
            )}

        </View>
    )
}