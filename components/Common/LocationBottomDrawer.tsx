import { TouchableOpacity, View, ActivityIndicator, FlatList } from "react-native"
import Label from "../Base/Label"
import { FontSizes, FontTypes, IconNames, LocationData } from "@/types/Components"
import { Colors } from "@/constants/Colors"
import React, { useState } from "react"
import Icon from "../Base/Icon"
import { parseLocation } from "@/utils/commonUtils"
import BottomDrawer from "../Base/BottomDrawer"
import { useFetchLocations } from "@/hooks/get/useFetchLocations"
import { Input } from "../Base/Input"

type LocationBottomDrawerProps = {
    uid: string
    showDrawer: boolean
    location?: LocationData
    setShowDrawer: (show: boolean) => void
    setLocation: (location: LocationData) => void
  }
  
  export const LocationBottomDrawer = (props: LocationBottomDrawerProps) => {
    const [textQuery, setTextQuery] = useState<string>('')
  
    const { data: locations, isFetching: fetchingLocations, isFetchingNextPage, refetch: fetchLocations, fetchNextPage } = useFetchLocations(props.uid || '', textQuery, false)
  
    const onClose = (data?: LocationData) => {
      props.setLocation?.(data || {name: textQuery, address: ''})
      props.setShowDrawer(false)
      setTextQuery('')
    }

    const onHideDrawer = () => {
        setTextQuery('')
        props.setShowDrawer(false)
    }
  
    return (
      <BottomDrawer showModal={props.showDrawer} contentWrapperStyles={{ height: '90%' }} setShowModal={onHideDrawer}>
        <Input classNames="mb-5" placeholder="CHALLENGE LOCATION" icon={IconNames.location} iconRight={!!textQuery?.trim()? IconNames.check: IconNames.close} containerStyles={{ height: 50, backgroundColor: Colors.dark["grey-shade-1"], paddingHorizontal: 10, marginBottom: 7 }} value={!!textQuery ? textQuery : (props.location?.name || '')} onPressIconRight={() => !!textQuery?.trim()? onClose(): onHideDrawer()} onChange={setTextQuery} onSubmitEditing={fetchLocations} />
        {fetchingLocations && !isFetchingNextPage && <ActivityIndicator color={Colors.light.white} size={25} />}
        {locations && (
          <FlatList
            className=" px-2"
            showsVerticalScrollIndicator={false}
            data={locations}
            extraData={locations}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({item}) => {
              const parsedItem = parseLocation(item)
              return (
                <TouchableOpacity className={`w-full px-1 ${parsedItem.address? '': 'py-2'}`} style={{borderBottomWidth: 1, borderColor: Colors.dark['grey-shade-2']}} onPress={() => onClose(parsedItem)}>
                  <Label type={FontTypes.FLabelBold} classNames="py-2" color={Colors.dark.background} label={parsedItem.name} />
                  {parsedItem.address && (
                    <View className="w-full flex flex-row items-center">
                      <Icon color={Colors.dark['primary-shade-3']} classNames="ml-1" name={IconNames.locationPoint}/>
                      <Label type={FontTypes.FLabel} classNames="pl-1 pr-2 pb-2" containerStyles={{fontStyle: 'italic'}} color={Colors.dark['grey-shade-4']} label={parsedItem.address} />
                    </View>
                  )}
                </TouchableOpacity> 
              )
            }}
            ListFooterComponent={() => isFetchingNextPage && <ActivityIndicator color={Colors.light.white} size={15} />}
            onEndReachedThreshold={0.7}
            onEndReached={() => fetchNextPage()}
          />
        )}
      </BottomDrawer>
    )
  }