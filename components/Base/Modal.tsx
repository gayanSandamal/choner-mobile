import { Modal as RNModal, View, StyleSheet } from 'react-native';
import { ModalProps } from '@/types/Components';
import { Colors } from '@/constants/Colors';

const styles = StyleSheet.create({
  modalWrapper: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(15, 32, 40, 0.7)'},
  customModalWrapper: {width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'rgba(15, 32, 40, 0.7)'},
  modalContentWrapper: {backgroundColor: Colors.dark.disabled, borderRadius: 8, padding: 20, width: '90%', height: 'auto'},
});

export default function Modal(props: ModalProps) {
  return (
    <RNModal
      transparent={true}
      visible={props.showModal}
      animationType={'fade'}
      onRequestClose={() => props.setShowModal(false)}
    >
      {!props.customModal && (
        <View style={styles.modalWrapper}>
          <View style={styles.modalContentWrapper}>
            {props.children}
          </View>
        </View>
      )}
      {props.customModal && (
        <View style={styles.customModalWrapper}>
          {props.children}
        </View>
      )}
    </RNModal>
  )
}
