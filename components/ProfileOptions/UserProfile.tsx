import { Colors } from "@/constants/Colors"
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import { Avatar } from "../Base/Avatar"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import { useUser } from "@/contexts/userContext"
import Label from "../Base/Label"
import { Btn } from "../Base/Button"
import React, { useState } from "react"
import { TextArea } from "../Base/TextArea"
import { useSetUser } from "@/hooks/mutate/useMutateUser"
import { router } from "expo-router"
import { User } from "@/types/User"

const styles = StyleSheet.create({
    wrapper: {flex: 1, alignItems: 'center'},
    avatarWrapper: {flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 10, marginBottom: 10},
    avatar: { marginTop: 20, backgroundColor: '#F7971E' },
    desctiptionButtons: {flexDirection: 'row', width: '100%', marginTop: 10}
})

export default function UserProfile () {
    const {user, setUser}= useUser()

    const [showEditDesc, setShowEditDesc] = useState<boolean>(false)
    const [newDescription, setNewDescription] = useState<string>(user?.description || '')

    const {mutate: updateUser, isPending: isUpdatingUser} = useSetUser((data) => onSuccessUpdatingUser(data), () => {})

    const onSuccessUpdatingUser = (data: User) => {
        user && setUser({...user, description: data.description})
        setShowEditDesc(false)
        setNewDescription('')
    }

    const onSaveDescription = () => {
        updateUser({uid: user?.uid || '', description: newDescription})
    }

    const onCancel = () => {
        setShowEditDesc(false)
        setNewDescription('')
    }


    const noDiscription = !user?.description || user?.description?.length === 0

    return  (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.wrapper}>
            <View style={styles.avatarWrapper}>
                <View className="items-center mt-[20px]">
                    <Label label="453" type={FontTypes.FTitle1} />
                    <Label label="Following" type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} />
                </View>
                <Avatar img={user?.profileImageUrl} containerStyles={styles.avatar} size={InputSizes.xl} onPressAvatar={() => router.navigate('/basic-info')} />
                <View className="items-center mt-[20px]">
                    <Label label="20.4K" type={FontTypes.FTitle1} />
                    <Label label="Followers" type={FontTypes.FLabel} color={Colors.dark['grey-shade-3']} />
                </View>
            </View>
            <Label
            classNames="mb-[10px]"
                type={FontTypes.FTitle3Bold}
                color={Colors.dark["grey-shade-4"]}
                label={`${user?.displayName}${user?.professionalIn ? ` | ${user.professionalIn}`: ''}`}
            />
            {!showEditDesc && user?.description && <Label
                classNames="mb-[15px] text-center"
                type={FontTypes.FLabel}
                color={Colors.dark["grey-shade-4"]}
                label={user?.description || ''}
            />}
            {showEditDesc && <TextArea disableNewLine height={104} value={newDescription} maxLines={6} maxCharacters={320} placeHolder={'Add a description here...'} onChangeText={setNewDescription} />}
            {!showEditDesc && <Btn wrapperClasses={noDiscription ? "" : "ml-[auto]"} className="pt-[4px] pb-[4px]" outlined onPress={() => setShowEditDesc(true)} icon={IconNames.editPencil} size={InputSizes.md} color={Colors.dark['primary-shade-2']} label={noDiscription ? "ADD BIO" : "EDIT BIO"} />}
            {showEditDesc && <View style={styles.desctiptionButtons}>
                <Btn disabled={isUpdatingUser} wrapperClasses="ml-[auto]" outlined onPress={onCancel} size={InputSizes.md} color={Colors.dark['grey-shade-3']} label="CANCEL" />
                <Btn isLoading={isUpdatingUser} wrapperClasses="ml-[10px]" className={isUpdatingUser ? "pt-[4px] pb-[4px]" : ""} onPress={onSaveDescription} size={InputSizes.md} backgroundColor={Colors.dark['green-shade-1']} label="SAVE" />    
            </View>}
        </View>
    </TouchableWithoutFeedback>)
}