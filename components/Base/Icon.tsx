import { IconName, IconNames, IconProps, InputSizes } from "@/types/Components";
import * as Icons from "./Icons";
import { Colors } from "@/constants/Colors";
import Svg from "react-native-svg";

const getIcon = (props: { color: string, name: IconName }) => {
    const { color, name } = props;
    const iconMap = {
        [IconNames.bell]: <Icons.IconBell fill={color} />,
        [IconNames.insight]: <Icons.IconInsight fill={color} />,
        [IconNames.handshake]: <Icons.IconHandshake fill={color} />,
        [IconNames.interests]: <Icons.IconInterests fill={color} />,
        [IconNames.interestsFill]: <Icons.IconInterestsFill fill={color} />,
        [IconNames.play]: <Icons.IconPlay fill={color} />,
        [IconNames.trophy]: <Icons.IconTrophy fill={color} />,
        [IconNames.search]: <Icons.IconSearch fill={color} />,
        [IconNames.fist]: <Icons.IconFistBump fill={color} />,
        [IconNames.biceps]: <Icons.IconBiceps fill={color} />,
        [IconNames.addPost]: <Icons.IconAddPost fill={color} />,
        [IconNames.qanda]: <Icons.IconQandA fill={color} />,
        [IconNames.close]: <Icons.IconClose fill={color} />,
        [IconNames.send]: <Icons.IconSend fill={color} />,
        [IconNames.options]: <Icons.IconOptions fill={color} />,
        [IconNames.login]: <Icons.IconLogin fill={color} />,
        [IconNames.register]: <Icons.IconRegister fill={color} />,
        [IconNames.chevronLeft]: <Icons.IconChevronLeft fill={color} />,
        [IconNames.email]: <Icons.IconEmail fill={color} />,
        [IconNames.password]: <Icons.IconPassword fill={color} />,
        [IconNames.apple]: <Icons.IconApple fill={color} />,
        [IconNames.google]: <Icons.IconGoogle fill={color} />,
        [IconNames.facebook]: <Icons.IconFacebook fill={color} />
    };

    return iconMap[name];
};

const Icon = (props: IconProps) => {
    const { color = Colors.dark.background, name = IconNames.bell, size = InputSizes.md, width = 24, height = 24 } = props
    const styles = () => {
        if (size === InputSizes.sm) {
            return {
                scale: 0.8
            }
        } else if (size === InputSizes.md) {
            return {
                scale: 1
            }
        } else if (size === InputSizes.lg) {
            return {
                scale: 1.2
            }
        } else {
            return {
                scale: 1
            }
        }
    }
    return (
        <Svg width={width} height={height} style={{ transform: [{ scale: styles().scale }] }}>
            {getIcon({ color, name })}
        </Svg>
    )
}

export default Icon