import { Colors } from '@/constants/Colors';
import { AvatarProps, InputSize, InputSizes } from '@/types/Components';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const getSize = (size: InputSize) => {
    let dimentions = {
        wrapper: 16,
        img: 16
    }
    if (size === InputSizes.xs) {
        dimentions = {
            wrapper: 16,
            img: 12
        }
    } else if (size === InputSizes.sm) {
        dimentions = {
            wrapper: 32,
            img: 28
        }
    } else if (size === InputSizes.md) {
        dimentions = {
            wrapper: 80,
            img: 74
        }
    } else if (size === InputSizes.lg) {
        dimentions = {
            wrapper: 100,
            img: 90
        }
    }
    return {
        wrapper: {
            width: dimentions.wrapper,
            height: dimentions.wrapper,
            borderRadius: dimentions.wrapper
        },
        img: {
            width: dimentions.img,
            height: dimentions.img,
            borderRadius: dimentions.img
        }
    }
}

const dummyImgUrl = 'https://media.licdn.com/dms/image/D5603AQHSXcO7ppl6WA/profile-displayphoto-shrink_400_400/0/1718211361174?e=1724889600&v=beta&t=23Did5ziv00-uQIhIvA2_i7BpNwAV1YXI3ob8RKIrEU'

export const Avatar = (props: AvatarProps) => {
    const { containerStyles, img = dummyImgUrl, size = InputSizes.md, bgColor = Colors.dark.background } = props
    const wrapperDimensions = getSize(size).wrapper
    const imgDimensions = getSize(size).img
    return (
        <View style={[styles.container, { backgroundColor: bgColor }, wrapperDimensions, containerStyles]}>
            <Image
                style={[imgDimensions]}
                source={img}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});