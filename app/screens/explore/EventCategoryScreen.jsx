import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { globalStyles } from '@/app/constants/globalStyles'
import { Ionicons } from '@expo/vector-icons';
import { AxiosInstance } from '@/app/services'
import { appColors } from '@/app/constants/appColors'
import { RowComponent } from '@/app/components'
import EventItem from '@/app/components/EventItem';


const EventCategoryScreen = ({navigation, route}) => {
    const {id, name, color, icon} = route.params
    const [eventCategory, setEventCategory] = useState([]);
    

    useEffect(() => {

        const getEventCategory = async () => {
            try {
                const response = await AxiosInstance().get(`events/categories/${id}`);
                setEventCategory(response.data);
            } catch(e) {
                console.log(e)
            }
        }

        getEventCategory()
        
        return () => {
            setEventCategory([]);
        };
    }, []);

    const handleNavigation = () => {
        navigation.goBack();
    }

    
  return (
    <View style = {globalStyles.container}>
        
      <View style={[styles.header, {backgroundColor: color}]}>
        <StatusBar animated backgroundColor={color} />
         
         <RowComponent onPress={handleNavigation} styles = {{columnGap: 25}}>
             <Ionicons name="chevron-back" size={26} color="white" />
             <Text style = {styles.headerTitle} >{name}</Text>
         </RowComponent>
         <View>
            <MaterialIcons
                name={icon}
                size={28}
                color={appColors.white}
           
            />
         </View>
     </View>

     <FlatList
      data={eventCategory}
      renderItem={({ item }) => <EventItem onPress={() => {
        navigation.navigate("Detail", {
            id: item._id
        })
      }} styles = {{width: "95%"}} type="card" item={item} />}
      showsVerticalScrollIndicator={false}
    />
    </View>
  )
}

export default EventCategoryScreen

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: "center",
        columnGap: 18,
        padding: 12,
        paddingTop: Platform.OS === "ios" ? 66 : 22
      },
    headerTitle: {
        color: appColors.white2,
        fontSize: 22,
        fontWeight: "500"
    
      },
})