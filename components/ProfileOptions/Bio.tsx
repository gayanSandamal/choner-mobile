import { ActivityIndicator, View, StyleSheet } from "react-native"
import Label from "../Base/Label"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import { Avatar } from "../Base/Avatar"
import { router } from "expo-router"
import { Btn } from "../Base/Button"
import { TextArea } from "../Base/TextArea"
import { useUser } from "@/contexts/userContext"
import { useState } from "react"
import { useSetUser } from "@/hooks/mutate/useMutateUser"
import { User } from "@/types/User"
import { Colors } from "@/constants/Colors"

const styles = StyleSheet.create({
    wrapper: {alignItems: 'center'},
    avatarWrapper: {flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 10},
    avatar: { marginTop: 20, backgroundColor: '#F7971E' },
    bioButtons: {flexDirection: 'row', width: '100%', marginTop: 10}
})

export const Bio = () => {
    const {user, setUser}= useUser()

    const [showEditBio, setShowEditBio] = useState<boolean>(false)
    const [newBio, setNewBio] = useState<string>(user?.bio || '')

    const {mutate: updateUser, isPending: isUpdatingUser} = useSetUser((data) => onSuccessUpdatingUser(data), () => {})

    const onSuccessUpdatingUser = (data: User) => {
        user && setUser({...user, bio: data.bio})
        setShowEditBio(false)
        setNewBio(data.bio)
    }

    const onSaveBio = () => {
        updateUser({uid: user?.uid || '', bio: newBio})
    }

    const onCancel = () => {
        setShowEditBio(false)
        setNewBio(user?.bio || '')
    }

    const noDiscription = !user?.bio || user?.bio?.length === 0
    return (
        <View style={styles.wrapper}>
            <View style={styles.avatarWrapper}>
                {/* <View className="items-center mt-[20px]">
                    <Label label="453" type={FontTypes.FTitle1} />
                    <Label label="Following" type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} />
                </View> */}
                <Avatar img={user?.profileImageUrl} containerStyles={styles.avatar} size={InputSizes.xl} onPressAvatar={() => router.navigate('/(app)/(profile)/(settings)/basic-info')} />
                {/* <View className="items-center mt-[20px]">
                    <Label label="20.4K" type={FontTypes.FTitle1} />
                    <Label label="Followers" type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} />
                </View> */}
            </View>
            {!user ? 
                <ActivityIndicator className="mt-[30px] mb-[30px]" />
            : <>
                <Label
                    classNames="mb-[10px]"
                    type={FontTypes.FTitle3Bold}
                    color={Colors.dark["grey-shade-4"]}
                    label={user?.displayName || ''}
                />
                {!showEditBio && user?.bio && <Label
                    classNames="mb-[15px] text-center"
                    type={FontTypes.FLabel}
                    color={Colors.dark["grey-shade-4"]}
                    label={user?.bio || ''}
                />}
                {showEditBio && <TextArea disableNewLine height={104} value={newBio} maxLines={6} maxCharacters={320} placeHolder={'Add a bio here...'} onChangeText={setNewBio} />}
                {!showEditBio && <Btn wrapperClasses={noDiscription ? "" : "ml-[auto]"} classNames="pt-[4px] pb-[4px]" outlined onPress={() => setShowEditBio(true)} icon={IconNames.editPencil} size={InputSizes.md} color={Colors.dark['primary-shade-2']} label={noDiscription ? "ADD BIO" : "EDIT BIO"} />}
                {showEditBio && <View style={styles.bioButtons}>
                    <Btn disabled={isUpdatingUser} wrapperClasses="ml-[auto]" outlined onPress={onCancel} size={InputSizes.md} color={Colors.dark['grey-shade-3']} label="CANCEL" />
                    <Btn isLoading={isUpdatingUser} wrapperClasses="ml-[10px]" classNames={isUpdatingUser ? "pt-[4px] pb-[4px]" : ""} onPress={onSaveBio} size={InputSizes.md} backgroundColor={Colors.dark['green-shade-1']} label="SAVE" />    
                </View>}
            </>}
        </View>
    )
}