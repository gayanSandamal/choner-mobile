import { Platform, SafeAreaView, StyleSheet, View } from "react-native"
import { Spacer } from "../Base/Spacer"
import NavigateBack from "../Common/NavigateBack"
import { router } from "expo-router"
import { Colors } from "@/constants/Colors"
import { SettignsWrapperProps } from "@/types/Components"

const styles = StyleSheet.create({
    wrapper: { justifyContent: 'center', alignItems: 'flex-start', backgroundColor: Colors.dark.grey },
    subWrapper: {paddingHorizontal: 15, width: '100%', height: '100%'}
})

export const SettingsWrapper = (props: SettignsWrapperProps) => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.subWrapper}>
                {Platform.OS === 'android' && <Spacer height={70}/>}
                <NavigateBack label={props.header} navigate={() => props.onBack?.() || router.back()} />
                {props.children}
            </View>
        </SafeAreaView>
    )
}