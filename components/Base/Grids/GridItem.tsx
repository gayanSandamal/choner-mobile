import { GridItemProps } from "@/types/Components";
import React from "react";
import { View } from "react-native";

const GridItem = (props: GridItemProps) => {
  const { classNames, columns = 1, gridDimentions = { width: 0, height: 0 }, children } = props;

  const getWidth = () => {
    if (columns === 1) {
      return gridDimentions?.width
    } else if (columns === 2) {
      return (gridDimentions?.width / columns) - 10
    } else if (columns === 3) {
      return ~~Number(gridDimentions?.width / columns) - 13.5
    }
  }
  return (
    <View className={`${classNames}`} style={{ width: getWidth() }}>
      {children}
    </View>
  )
}

export default GridItem;
