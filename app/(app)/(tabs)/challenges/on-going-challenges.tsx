import { CharmBtn } from "@/components/Base/Button"
import { ActionBar, PostModal } from "@/components/Post/Post"
import { useTabSelector } from "@/contexts/tabSelectorContext"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { IconNames, InputSizes, PostType } from "@/types/Components"
import { router } from "expo-router"
import { useState } from "react"
import { FlatList, View } from "react-native"

const OnGoingChallengesScreen = () => {
    const uid = useAuthUserId()
    const {tabs, setTabs} = useTabSelector()

    const [showChallengeCreate, setShowChallengeCreate] = useState<boolean>(false)
    
    const onCloseModal = () => {
        setShowChallengeCreate(false)
    }

    return (
        <View className='bg-grey h-full'>
            <FlatList
                className='px-3 bg-grey'
                data={[{}]}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                    <View className="w-full flex flex-row items-center justify-between">
                        <CharmBtn classNames="mb-1 mr-3" icon={IconNames.chevronLeft} onPress={() => router.back()} size={InputSizes.md} frame={true} />
                        <View style={{flex: 1}}>
                            <ActionBar title='Post a challenge...' active={false} onPress={() => setShowChallengeCreate(true)} />    
                        </View>
                    </View>
                    </>
                )}
                renderItem={({item}) => <></>}
            />
            <PostModal
              postType={PostType.challenge}
              showModal={showChallengeCreate}
              postParams={undefined}
              postHeaderData={{
                icon: IconNames.trophy,
                title: 'Publish challenge'
              }}
              actionBarData={{ title: 'Post a challenge...' }}
              onCancel={onCloseModal}
              setShowModal={onCloseModal}
            />
        </View>
    )
}

export default OnGoingChallengesScreen
