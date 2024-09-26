import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { ModalProps } from '@/types/Components';
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
    modalWrapper: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15, 32, 40, 0.5)'},
    modalContentWrapper: {position: 'absolute', bottom: 0, width:'100%', height: 'auto', borderTopStartRadius: 10, borderTopEndRadius: 8, backgroundColor: Colors.dark.disabled, padding: 10, paddingTop: 30},
});

export default function BottomDrawer(props: ModalProps) {
  return (
    <Modal transparent={true} animationType="slide" visible={props.showModal} onRequestClose={() => props.setShowModal(false)}>
        <Pressable style={styles.modalWrapper} onPress={() => props.setShowModal(false)}/>
        <View style={styles.modalContentWrapper}>
          {props.children}
        </View>
    </Modal>
  )
}
