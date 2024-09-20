import { SafeAreaView, StyleSheet, View } from "react-native"
import { Spacer } from "../Base/Spacer"
import NavigateBack from "../Common/NavigateBack"
import { router } from "expo-router"
import { Colors } from "@/constants/Colors"
import { SettignsWrapperProps } from "@/types/Components"

const styles = StyleSheet.create({
    wrapper: { flex: 1, justifyContent: 'center', backgroundColor: Colors.dark.grey },
    subWrapper: { padding: 20, width: '100%', height: '100%' }
})

export const SettingsWrapper = (props: SettignsWrapperProps) => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.subWrapper}>
                <Spacer height={70}/>
                <NavigateBack label={props.header} navigate={() => props.onBack?.() || router.back()} />
                {props.children}
            </View>
        </SafeAreaView>
    )
}