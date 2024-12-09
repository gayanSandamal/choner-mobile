import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    'shadow-sm': {
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    'shadow-md': {
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    }
})