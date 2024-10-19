import { FlatList, View } from "react-native"
import BottomDrawer from "../Base/BottomDrawer"
import { BtnDetailed } from "../Base/Button"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { IconNames } from "@/types/Components"

const imagePromptText = [{icon: IconNames.camera, text: 'Take a photo'}, {icon: IconNames.gallery, text: 'Choose from gallery'}]

type ImagePickerBottomDrawerProps = {
    showDrawer: boolean
    setShowDrawer: (show: boolean) => void
    onPressImagePickItem: (index: number) => void
}

export const ImagePickerBottomDrawer = (props: ImagePickerBottomDrawerProps) => {
    return (
        <BottomDrawer showModal={props.showDrawer} setShowModal={props.setShowDrawer}>
            <FlatList
                data={imagePromptText}
                keyExtractor={(item) => `${item.text}`}
                renderItem={({ item, index }) => (
                    <BtnDetailed
                        label={item.text} 
                        leftIcon={{name: item.icon, color: Colors.light.white}}
                        wrapperStyle={{borderWidth: 0, borderBottomWidth: 1, borderRadius: 0}}
                        onPress={() => props.onPressImagePickItem(index)}
                    />
                )}
                ItemSeparatorComponent={() =>{ return <View className="mt-1"/>}}
            />
        </BottomDrawer>
    )
}