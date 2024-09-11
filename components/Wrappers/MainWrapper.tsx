import { Colors } from "@/constants/Colors"
import { MainWrapperProps } from "@/types/Components"
import { SafeAreaView, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.grey }
})

export const MainWrapper = (props: MainWrapperProps) => {
    return <SafeAreaView style={styles.wrapper} children={props.children} />
}