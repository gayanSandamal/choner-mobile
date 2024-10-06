import { useState } from "react"
import { Input } from "../Base/Input"
import { View, StyleSheet, FlatList, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native"
import { Btn, BtnDetailed } from "../Base/Button"
import { FontSizes, IconNames, InputSizes, UploadImage } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import { router } from "expo-router"
import { getBlobFromUri, matchOnlyLetters } from "@/utils/commonUtils"
import Label from "../Base/Label"
import { useUser } from "@/contexts/userContext"
import { useSetUser } from "@/hooks/mutate/useMutateUser"
import { Avatar } from "../Base/Avatar"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from 'expo-media-library'
import Icon from "../Base/Icon"
import { useUploadImage } from "@/hooks/mutate/useMutateImage"
import BottomDrawer from "../Base/BottomDrawer"

const styles = StyleSheet.create({
    avatarWrapper: {marginLeft: 'auto', marginRight: 'auto'},
    avatar: { marginTop: 20, backgroundColor: '#F7971E' },
    cameraButton: {position: 'absolute', bottom: 0, right: -3, padding: 6, borderRadius: 8, backgroundColor: Colors.dark['grey-transparent']},
    dropDownWrapper: {zIndex: 1},
    btnWrapper: { width: '100%', paddingHorizontal: 25, borderRadius: 30, height: 60, marginBottom: 20, backgroundColor: Colors.dark['fied-bg-idle'], flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0 },
    dropdown: { position: 'absolute', marginTop: 70, backgroundColor: Colors.dark['fied-bg-idle'], borderRadius: 5, width: '100%', zIndex: 2 },
    dropdownItem: { padding: 15 },
    dropDownText: { color: Colors.light.white },
})

const professions = ['LIFE COACH', 'MENTOR', 'FITNESS COACH', 'YOGA EXPERT']

const imagePromptText = [{icon: IconNames.camera, text: 'Take a photo'}, {icon: IconNames.gallery, text: 'Choose from gallery'}]

export default function SettingsHome() {
    const {user} = useUser()

    const {uploadImage} = useUploadImage((uri) => updateUserWithImage(uri), (e) => onUploadImageError(e))

    const [firstName, setFirstName] = useState<string>(user?.displayName?.split(' ')?.[0] || '')
    const [lastName, setLastName] = useState<string>(user?.displayName?.split(' ')?.[1] || '')
    const [selectedProfession, setSeletedProfession] = useState<string | null>(user?.professionalIn || null)
    const [image, setImage] = useState< UploadImage| null>(null)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [isUpdating, setIsupdating] = useState<boolean>(false)
    const [showDrawer, setShowDrawer] = useState<boolean>(false)

    const {mutate: updateUser} = useSetUser(() => onSuccess(), () => onError())

    const checkAndSetFirstName = (text: string) => {
        if (isUpdating) return
        setFirstName(text.trim() === '' ? '' : matchOnlyLetters(text) ? text : lastName)
    }

    const checkAndSetLastName = (text: string) => {
        if (isUpdating) return
        setLastName(text.trim() === '' ? '' : matchOnlyLetters(text) ? text : lastName)
    }

    const onSave = async () => {
        setIsupdating(true)  

        if (user && image?.blob) {
            await uploadImage(image, user)
        }
        
        user && !image?.blob && updateUser(commonUploadData())
    }

    const updateUserWithImage = (uri: string) => {
        const newUrl = uri.replace(`.${image?.type}`, '_200x200.png')
        updateUser({...commonUploadData(), profileImageUrl: newUrl})
    }

    const onUploadImageError = (e: any) => {
        setIsupdating(false)  
        setImage(null)
    }

    const onSuccess = () => {
        setIsupdating(false)  
    }

    const onError = () => {
        setImage(null)
        setIsupdating(false)  
        setFirstName(user?.displayName?.split(' ')?.[0] || '')
        setLastName(user?.displayName?.split(' ')?.[1] || '')
    }

    const commonUploadData = () => {
        return {
            uid: user?.uid || '',
            displayName: firstName + ' ' + lastName,
            profileImageUrl: user?.profileImageUrl,
            ...(selectedProfession && { professionalIn: selectedProfession }),
        }
    }

    const pickImage = async () => {
        if (isUpdating) return

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
    
        if (!result.canceled) await setImageData(result)
    }
    
    const captureAndPickImage = async () => {
        await ImagePicker.requestCameraPermissionsAsync()
        await MediaLibrary.requestPermissionsAsync()
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) await setImageData(result)
    }

    const setImageData = async (image: ImagePicker.ImagePickerResult) => {
        const imageUri = image?.assets?.[0].uri || ''
        const imageType = image?.assets?.[0]?.fileName?.split('.').slice(-1)[0] || 'jpg'
        const imageBlob = await getBlobFromUri(imageUri)
    
        setImage({
            uri: imageUri,
            name: `${user?.uid}.${imageType}`,
            type: imageType,
            blob: imageBlob as Blob,
        })
    }
            
    const toggleDropdown = () => {
        Keyboard.isVisible() && Keyboard.dismiss()
        setDropdownVisible(!dropdownVisible)
    }
    const selectProfession = (profession: string) => {
        setSeletedProfession(profession)
        setDropdownVisible(false)
    }

    const onPressImagePickItem = (index: number) => {
        index === 0 ? captureAndPickImage(): pickImage()
        setShowDrawer(false)
    }
    
    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{flex: 1}}>
            <View style={styles.avatarWrapper}>
                <Avatar img={image?.uri || user?.profileImageUrl} containerStyles={styles.avatar} size={InputSizes.xl} onPressAvatar={() => setShowDrawer(true)}/>
                <TouchableOpacity disabled={isUpdating} style={styles.cameraButton} onPress={() => setShowDrawer(true)}>
                    <Icon name={IconNames.camera} />
                </TouchableOpacity>
            </View>
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
                <Btn outlined disabled={isUpdating} onPress={() => router.back()} icon={IconNames.cancel} size={InputSizes.lg} color={Colors.dark['green-shade-1']} label="CANCEL" />
                <Btn isLoading={isUpdating} disabled={isUpdating} onPress={onSave} icon={IconNames.save} size={InputSizes.lg} backgroundColor={Colors.dark['green-shade-1']} label="SAVE" />
            </View>       
            <BottomDrawer showModal={showDrawer} setShowModal={setShowDrawer}>
                <FlatList
                    data={imagePromptText}
                    keyExtractor={(item) => `${item.text}`}
                    renderItem={({ item, index }) => (
                        <BtnDetailed
                            label={item.text} 
                            leftIcon={{name: item.icon, color: Colors.light.white}}
                            wrapperStyle={{borderWidth: 0, borderBottomWidth: 1, borderRadius: 0}}
                            onPress={() => onPressImagePickItem(index)}
                        />
                    )}
                    ItemSeparatorComponent={() =>{ return <View className="mt-1"/>}}
                />
            </BottomDrawer>
        </View>
    </TouchableWithoutFeedback>
    )
}