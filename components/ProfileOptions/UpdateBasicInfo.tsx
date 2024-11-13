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
import { ImagePickerBottomDrawer } from "../Common/ImagePickerBottomDrawer"
import { StoragePaths } from "@/constants/values"
import { Toast } from "toastify-react-native"

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

    const [firstName, setFirstName] = useState<string>(user?.displayName?.split(' ')?.[0] || '')
    const [lastName, setLastName] = useState<string>(user?.displayName?.split(' ')?.[1] || '')
    const [image, setImage] = useState< UploadImage| null>(null)
    const [isUpdating, setIsupdating] = useState<boolean>(false)
    const [showDrawer, setShowDrawer] = useState<boolean>(false)

    const {mutate: updateUser} = useSetUser(() => onSuccess(), () => onError())
    const {uploadImage} = useUploadImage((uri) => updateUserWithImage(uri), (e) => onUploadImageError(e))

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
            await uploadImage(image, StoragePaths.USER)
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
        Toast.success('Updated!')
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
            <Label classNames='text-white mt-6 mb-3' label="Registered email" />
            <Input classNames='mb-5' placeholder={'First name'} fontSize={FontSizes.FLabel} value={user?.email} disabled onChange={checkAndSetFirstName} />
            <Label classNames='text-white mb-3' label="First name" />
            <Input classNames='mb-5' placeholder={'First name'} fontSize={FontSizes.FLabel} value={firstName} onChange={checkAndSetFirstName} />
            <Label classNames='text-white mb-3' label="Last name" />
            <Input classNames='mb-8' placeholder={'Last name'} fontSize={FontSizes.FLabel} value={lastName} onChange={checkAndSetLastName} />
            <View className="ml-0.5 mr-0.5 flex-row justify-between">
                <Btn outlined disabled={isUpdating} onPress={() => router.back()} icon={IconNames.cancel} size={InputSizes.md} color={Colors.dark['green-shade-1']} label="CANCEL" />
                <Btn isLoading={isUpdating} disabled={isUpdating} onPress={onSave} icon={IconNames.save} size={InputSizes.md} backgroundColor={Colors.dark['green-shade-1']} label="SAVE" />
            </View>
            <ImagePickerBottomDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} onPressImagePickItem={onPressImagePickItem} />
        </View>
    </TouchableWithoutFeedback>
    )
}