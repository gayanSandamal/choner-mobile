import { BaseGridProps } from "@/types/Components";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const BaseGrid = (props: BaseGridProps) => {
  const gap = 20
  const { children, onFetchDimensions } = props
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (dimensions.width > 0) onFetchDimensions?.(dimensions)
  }, [dimensions])

  return (
    <View className="flex flex-row flex-wrap" style={{ gap }} onLayout={event =>
      setDimensions({
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      })
    }
    >
      {children}
    </View>
  )
}

export default BaseGrid;
