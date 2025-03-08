import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity,Image, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '@/app/constants/globalStyles'
import { appColors } from '@/app/constants/appColors'
import { Ionicons } from '@expo/vector-icons';
import { ButtonComponent, InputComponent, RowComponent } from '@/app/components';
import { Lock, Sms, User } from "iconsax-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosInstance } from '@/app/services';
import LoadingModal from '../../modals/LoadingModal';



const ProfileEdit = ({navigation}) => {
  
  const [name, setName] = useState("");
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const userId =  await AsyncStorage.getItem("userId");
      setUserId(userId)
      console.log(userId);
    }
    getUserId();
  },[])

  const handleNavigation = () => {
    navigation.goBack();
  }

  const handleEditProfile = async () => {
    setIsLoading(true)
    try {
      const response = await AxiosInstance().put("users/edit",{
        id: userID,
        username: name
      });
      if(response.status) {
        Alert.alert("Thành công", "Chỉnh sửa thông tin thành công");
        navigation.navigate("Drawer")
      } 
    } catch(e) {
      console.log(e)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  if(isLoading) {
    return <LoadingModal />
  }

  

  return (
    <View style = {globalStyles.container} >
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.header}>
            <StatusBar animated backgroundColor={appColors.primary} />
            <RowComponent  onPress={handleNavigation} styles = {{columnGap: 25}}>
                <Ionicons name="chevron-back" size={26} color="white" />

                <Text style = {styles.headerTitle} >Chỉnh sửa cá nhân</Text>
            </RowComponent>
            </View>
            <View style = {styles.body}>
              <View style = {{alignItems: "center"}} >
                <Image style={{width: 150, height: 150}} source={require('../../../assets/images/profileAVT.png')} />
              </View>
              <InputComponent
               placeholder='Tên của bạn'
               value={name} onChange={(text) => setName(text)}
               suffix={<User size={22} color={appColors.gray} />}
  
              />
              <InputComponent
               placeholder='Email'
               value={email} onChange={(text) => setEmail(text)}
               suffix={<Sms size={22} color={appColors.gray} />}
               />
              <InputComponent 
                placeholder="Mật khẩu"
                value={password} onChange={(text) => setPassword(text)}
                suffix={<Lock size={22} color={appColors.gray} />}
                
                />
              <InputComponent 
               placeholder="Xác nhận mật khẩu" 
               value={password} onChange={(text) => setPassword(text)}
               suffix={<Lock size={22} color={appColors.gray} />}
               
               />
              <ButtonComponent text='Lưu thông tin' type="primary" onPress={() => handleEditProfile()} />
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </View>
  )
}

export default ProfileEdit

const styles = StyleSheet.create({
  header: {
  flexDirection: 'row',
  alignItems: "center",
  justifyContent: 'space-between',
  padding: 12,
  backgroundColor: appColors.primary,
  paddingTop: Platform.OS === "ios" ? 66 : 22
        },
  headerTitle:
  {
          color: appColors.white2,
          fontSize: 22,
          fontWeight: "500"
  },
  body: {
    rowGap: 20,
    marginTop: 40,
    // alignItems: "center",
    paddingHorizontal: 15,
  }
})