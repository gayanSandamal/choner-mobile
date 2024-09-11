import { useState } from "react"
import { Input } from "../Base/Input"
import { Spacer } from "../Base/Spacer"
import { ContentSection } from "../Wrappers/Sections"
import { View, Text, StyleSheet} from "react-native"
import { Btn } from "../Base/Button"
import { IconNames, InputSizes } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import { matchOnlyLetters } from "@/utils/commonUtils"
import Label from "../Base/Label"
import { useUser } from "@/contexts/userContext"
import { useSetUser } from "@/hooks/mutate/useMutateUser"
import { User } from "@/types/User"

const styles = StyleSheet.create({
    buttonStyles: {
        width: 190
    },
})

export default function() {
    const {user} = useUser()

    const [firstName, setFirstName] = useState<string>(user?.displayName?.split(' ')?.[0] || '')
    const [lastName, setLastName] = useState<string>(user?.displayName?.split(' ')?.[1] || '')

    const {mutate: updateUser, isPending: isUpdating} = useSetUser(() => onSuccess(), () => onError())


    const onSuccess = () => {}

    const onError = () => {
        setFirstName(user?.displayName?.split(' ')?.[0] || '')
        setLastName(user?.displayName?.split(' ')?.[1] || '')
    }

    const checkAndSetFirstName = (text: string) => {
        setFirstName(text.trim() === '' ? '' : matchOnlyLetters(text) ? text : lastName)
    }

    const checkAndSetLastName = (text: string) => {
        setLastName(text.trim() === '' ? '' : matchOnlyLetters(text) ? text : lastName)
    }

    const onSave = () => {
        user && updateUser({ uid: user?.uid, displayName: firstName + ' ' + lastName })
    }
    
    return (
        <View className='flex m-3'>
            <Label classNames='text-1xl text-white' label="First Name" />
            <Spacer height={5} />
            <Input classNames='mb-5' placeholder={'ENTER EMAIL'} value={firstName} onChange={checkAndSetFirstName} />
            <Spacer height={30} />
            <Label classNames='text-1xl text-white' label="Last Name" />
            <Spacer height={5} />
            <Input classNames='mb-5' placeholder={'ENTER EMAIL'} value={lastName} onChange={checkAndSetLastName} />
            <Spacer height={30} />
            <View className="flex-row w-full justify-between">
                <Btn disabled={isUpdating} style={styles.buttonStyles} onPress={onSave} icon={IconNames.insight} size={InputSizes.lg} outlined color={Colors.dark['green-shade-1']} label="SAVE CHANGES" />
                <Btn disabled={isUpdating} style={styles.buttonStyles} onPress={() => router.back()} icon={IconNames.login} size={InputSizes.lg} backgroundColor={Colors.dark['green-shade-1']} label="CANCEL" />
            </View>
        </View>
    )
}