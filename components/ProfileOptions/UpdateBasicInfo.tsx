import { useState } from "react"
import { Input } from "../Base/Input"
import { View, StyleSheet, FlatList, Text, TouchableOpacity} from "react-native"
import { Btn, BtnDetailed } from "../Base/Button"
import { FontSizes, IconNames, InputSizes } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import { matchOnlyLetters } from "@/utils/commonUtils"
import Label from "../Base/Label"
import { useUser } from "@/contexts/userContext"
import { useSetUser } from "@/hooks/mutate/useMutateUser"

const styles = StyleSheet.create({
    dropDownWrapper: {zIndex: 1},
    btnWrapper: { width: '100%', paddingHorizontal: 25, borderRadius: 30, height: 60, marginBottom: 20, backgroundColor: Colors.dark['fied-bg-idle'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    dropdown: { position: 'absolute', marginTop: 70, backgroundColor: Colors.dark['fied-bg-idle'], borderRadius: 5, width: '100%', zIndex: 2 },
    dropdownItem: { padding: 15 },
    dropDownText: { color: Colors.light.white },
})

const professions = ['LIFE COACH', 'MENTOR', 'FITNESS COACH', 'YOGA EXPERT']

export default function SettingsHome() {
    const {user} = useUser()

    const [firstName, setFirstName] = useState<string>(user?.displayName?.split(' ')?.[0] || '')
    const [lastName, setLastName] = useState<string>(user?.displayName?.split(' ')?.[1] || '')
    const [selectedProfession, setSeletedProfession] = useState<string | null>(user?.professionalIn || null)
    const [dropdownVisible, setDropdownVisible] = useState(false)

    
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
        user && updateUser({ uid: user?.uid, displayName: firstName + ' ' + lastName, ...(selectedProfession && {professionalIn: selectedProfession}) })
    }


    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible)
    }
    const selectProfession = (profession: string) => {
        setSeletedProfession(profession)
        setDropdownVisible(false)
    }
    
    return (
        <>
            <Label classNames='text-white  mb-[5px]' label="First name" />
            <Input classNames='mb-5' placeholder={'First name'} fontSize={FontSizes.FLabel} value={firstName} onChange={checkAndSetFirstName} />
            <Label classNames='text-white mb-[5px]' label="Last name" />
            <Input classNames='mb-5' placeholder={'Last name'} fontSize={FontSizes.FLabel} value={lastName} onChange={checkAndSetLastName} />
            <Label classNames='text-white mb-[5px]' label="Professional in" />
            <View style={styles.dropDownWrapper}>
                <BtnDetailed
                    label={selectedProfession || 'Select a profession'}
                    rightIcon={{ name: IconNames.down, color: Colors.dark['primary-shade-3'] }}
                    wrapperStyle={styles.btnWrapper}
                    onPress={toggleDropdown}
                />
                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={professions.filter((item) => item !== selectedProfession)}
                            keyExtractor={(item) => `${item}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => selectProfession(item)} style={styles.dropdownItem}>
                                    <Text style={styles.dropDownText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() =>{ return <View className="flex h-px ml-2 mr-2 bg-white"/>}}
                        />
                    </View>
                )}
            </View>
            <View className="ml-0.5 mr-0.5 flex-row justify-between">
                <Btn disabled={isUpdating} onPress={onSave} icon={IconNames.save} size={InputSizes.lg} outlined color={Colors.dark['green-shade-1']} label="SAVE CHANGES" />
                <Btn disabled={isUpdating} onPress={() => router.back()} icon={IconNames.login} size={InputSizes.lg} backgroundColor={Colors.dark['green-shade-1']} label="CANCEL" />
            </View>
        </>
    )
}