import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AxiosInstance } from '@/app/services';
import { globalStyles } from '@/app/constants/globalStyles';
import { ButtonComponent, CircleComponent, RowComponent, TextComponent } from '@/app/components';
import { appColors } from '@/app/constants/appColors';
import { formatDate } from "@/app/services/index";
import { formatPrice } from '@/app/services/utils/price';

const EventDetailScreen = ({navigation , route}) => {
    const { id } = route.params;
    const [detailEvent, setDetailEvent] = useState({
      "__v": 0,
      "_id": "",
      "avatar": "",
      "banner": "",
      "categories": "",
      "description": "",
      "image": "",
      "name": "",
      "soldTickets": 0,
      "ticketPrice": 0,
      "ticketQuantity": 0,
      "timeEnd": 0,
      "timeStart": 0,
      "location": "SECC, Quận 7, TP.HCM"
    });

    const handleNavigation = () => {
      navigation.goBack();
    }

    useEffect(() => {

        const getDetailEvent = async () => {
            const response = await AxiosInstance().get(`events/detail/${id}`);
            setDetailEvent(response.data)
        
        }

        getDetailEvent();

        return () => {
            setDetailEvent([])
        }
    },[])



  return (
    <SafeAreaView style={[globalStyles.container]}>
        <View style={styles.header}>
         
            <RowComponent  onPress={handleNavigation} styles = {{columnGap: 25}}>
                <Ionicons name="chevron-back" size={26} color="white" />
            
                <Text style = {styles.headerTitle} >Chi tiết sự kiện</Text>
            </RowComponent>
            
            <TouchableOpacity style={styles.bookmarkButton}>
                <Ionicons name="bookmark-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>

        <ScrollView style = {styles.body}>

            <ImageBackground style = {styles.imageBackground} blurRadius={8} source={{uri: detailEvent.avatar}} >
              <View style = {styles.containerEventDetail}>
                <Image
                  source={{uri: detailEvent.avatar}}
                  style={styles.imageEventDetail}
                />
                <View style = {styles.containerEventDetailInfo}>
                 <TextComponent text={detailEvent.name} size={16} styles = {{paddingVertical: 5,color: appColors.white2, fontWeight: "bold"}} />
                      <View style={styles.detailRow}>
                            <Ionicons name="calendar" size={18} color={appColors.primary} />
                              <Text style = {styles.detailSubtitle}>{`${formatDate(detailEvent.timeStart)} - ${formatDate(detailEvent.timeEnd)} `}</Text>
                      </View>

                      <View style={styles.detailRow}>
                            <Ionicons name="location" size={18} color={appColors.primary} />
                            <View>
                              <Text style={styles.detailSubtitle}>{detailEvent.location}</Text>
                            </View>
                      </View>
                  </View>
              </View>
            </ImageBackground>
            <View style={styles.aboutSection}>
              <TextComponent text='Thông tin sự kiện' size={24} />
              <Text style={styles.aboutText}>
                 {detailEvent.description}
              </Text>
            </View>
        </ScrollView>

           <View>
              <ButtonComponent onPress={() => {
                navigation.navigate("Ticket", {
                  id: detailEvent._id
                })
              }} text={`Mua vé với giá ${formatPrice(detailEvent.ticketPrice)}`} type="primary" 
              icon={ 
              <CircleComponent color={appColors.white}>
                <Ionicons name="arrow-forward" size={20} color={appColors.primary} />
              </CircleComponent>} iconFlex="right" />
            </View>
    </SafeAreaView>
  )
}

export default EventDetailScreen

const styles = StyleSheet.create({
      header: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: appColors.primary
      },
      headerTitle: {
        color: appColors.white2,
        fontSize: 22,
        fontWeight: "500"
    
      },
      body: {
        flex: 1,
      },
      imageBackground: {
        width: "100%",
        minHeight: 400, 
        justifyContent: "center"
        },
      containerEventDetail: {
        padding: 10,
      },
      imageEventDetail: {
        width: "100%",
        height: 200,
        objectFit: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },

      containerEventDetailInfo: {
        backgroundColor: "rgba(0,0,0,0.6)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10
      },
      detailRow: {
        columnGap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 16,
      },
      detailTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: appColors.white
      },
      detailSubtitle: {
        color: appColors.white2,
        marginTop: 2,
      },
      
      aboutSection: {
        paddingHorizontal: 20,
        marginTop: 20,
      },
      aboutText: {
        textAlign: "justify",
        color: '#6B7280',
        fontSize: 16,
        lineHeight: 26,
        letterSpacing: 0.5
      },
      buyTicketButton: {
        backgroundColor: '#4F46E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginTop: 24,
      },
      buyTicketText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
      },
})