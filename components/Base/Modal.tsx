import { Modal, View, Text, Pressable, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { BottomModalProps } from '@/types/Components';
import Ionicons from '@expo/vector-icons/Ionicons';

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});

export default function BottomModal(props: BottomModalProps) {
  const { isVisible, slot, title, hieght = '1/3', onClose } = props
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View className={`h-${hieght} w-full bg-white rounded-t-lg absolute bottom-0 shadow-2xl`}>
        <View className="h-16 bg-indigo-500 rounded-t-lg px-4 flex-row items-center justify-between">
          {title ? <Text className="text-white text-base font-medium">{title}</Text> : <View></View>}
          <Pressable onPress={onClose}>
            <Ionicons size={28} name="close-circle" color='#fff' />
          </Pressable>
        </View>
        <View className='p-4'>
          {slot}
        </View>
      </View>
    </Modal>
  );
}
