import { View, StyleSheet } from "react-native"
import { BtnDetailed } from "../Base/Button"
import { IconNames, PostOptionsProps, PostVisibility } from "@/types/Components"
import { Colors } from "@/constants/Colors"

const styles = StyleSheet.create({
  optionList: { borderWidth: 1, width: 120, borderRadius: 10, paddingBottom: 6, borderColor: Colors.light.white, position: 'absolute', backgroundColor:Colors.dark.darkText },
  optionListButton: {borderWidth: 0, width: '100%', height: 30, marginBottom: 0, padding: 0, paddingLeft: 8, marginVertical: 6, backgroundColor: 'transparent'},
})

export const PostOptions = (props: PostOptionsProps) => {
    if (!props.show) return <></>

    return (
      <View style={{...styles.optionList, ...(props.bottom && {bottom: props.bottom}), ...(props.right && {right: props.right})}}>
        {props.isOwner? (
          <>
            {props.postVisibility !== PostVisibility.public && (
              <>
                <BtnDetailed label="Update" leftIcon={{name: IconNames.editPencil}} wrapperStyle={styles.optionListButton} onPress={props.onUpdate} />
              </>
            )}
            <BtnDetailed label="Delete" leftIcon={{name: IconNames.delete}} wrapperStyle={styles.optionListButton} onPress={props.onDelete} />
          </>): <BtnDetailed label="Report" leftIcon={{name: IconNames.report}} wrapperStyle={styles.optionListButton} onPress={() => {}} />
        }
      </View>
    )
}