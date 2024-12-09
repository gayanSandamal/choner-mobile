import React, { ReactNode, useState, useEffect, useRef } from "react";
import { View, RefreshControl, ActivityIndicator, StyleSheet, Dimensions, GestureResponderEvent } from "react-native";

interface CustomFlatListProps<T> {
    data: T[]; // Array of items to render
    ListHeaderComponent?: ReactNode; // Optional, a React element or null
    renderItem: (params: { item: T; index: number }) => ReactNode; // Function to render an item
    ListFooterComponent?: ReactNode; // Optional, a React element or null
    refreshing?: boolean; // Optional, default is false
    onEndReachedThreshold?: number; // Optional, default is 0.5
    onEndReached?: () => void; // Optional, default is an empty function
    onRefresh?: () => void; // Optional, default is an empty function
    className?: string; // Optional, for styling
}

const CustomFlatList = <T,>({
    data = [],
    ListHeaderComponent = null,
    renderItem,
    ListFooterComponent = null,
    refreshing = false,
    onEndReachedThreshold = 0.5,
    onEndReached = () => {},
    onRefresh = () => {},
    className = "",
}: CustomFlatListProps<T>) => {
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(refreshing);
    const [isEndReached, setIsEndReached] = useState<boolean>(false);
    const containerRef = useRef<View | null>(null);

    const handleScroll = (event: GestureResponderEvent) => {
        const { locationY } = event.nativeEvent;
        const screenHeight = Dimensions.get("window").height;
        const totalContentHeight = scrollPosition + locationY;

        if (
            totalContentHeight >= screenHeight * (1 - onEndReachedThreshold) &&
            !isEndReached
        ) {
            setIsEndReached(true);
            onEndReached();
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        onRefresh();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000); // Simulate refresh delay
    };

    useEffect(() => {
        setIsRefreshing(refreshing);
    }, [refreshing]);

    return (
        <View
            style={styles.container}
            className={className}
            onTouchMove={handleScroll}
            ref={containerRef}
        >
            {refreshing && (
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
            )}
            {ListHeaderComponent && <View>{ListHeaderComponent}</View>}

            {data.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    {renderItem({ item, index })}
                </View>
            ))}

            {ListFooterComponent && <View>{ListFooterComponent}</View>}

            {isEndReached && (
                <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    itemContainer: {
        marginBottom: 10,
    },
    spinner: {
        marginVertical: 20,
    },
});

export default CustomFlatList;
