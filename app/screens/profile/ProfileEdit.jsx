import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '@/app/constants/globalStyles'
import { appColors } from '@/app/constants/appColors'
import { Ionicons } from '@expo/vector-icons';
import { ButtonComponent, InputComponent, RowComponent, TextComponent } from '@/app/components';
import { Lock, Sms, User } from "iconsax-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosInstance } from '@/app/services';
import LoadingModal from '../../modals/LoadingModal';

const ProfileEdit = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [userID, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      const userID = await AsyncStorage.getItem("userId");
      const response = await AxiosInstance().get(`users/${userID}`);
      setName(response.data.username);
      setEmail(response.data.email);
      setUserId(userID);
      console.log("userId: " + userID);
      console.log("password: " + response.data.password);
      console.log(name);
      
      
      
    };
    getUserInfo();
  }, []);

  const handleNavigation = () => {
    navigation.goBack();
  };

  const handleEditProfile = async () => {
    setIsLoading(true);
  
    try {
      // Cập nhật username
      const updateUserResponse = await AxiosInstance().put("users/edit", {
        id: userID,
        username: name,
      });
  
  
      // Nếu người dùng muốn thay đổi mật khẩu
      if (oldPassword && newPassword && reNewPassword) {
        if (newPassword !== reNewPassword) {
          Alert.alert("Thông báo!", "Mật khẩu mới và xác nhận mật khẩu không khớp.");
          setIsLoading(false);
          return;
        }
  
        // Gửi mật khẩu lên server để xác thực và cập nhật
        const passwordResponse = await AxiosInstance().put("users/editPassword", {
          id: userID,
          currentPassword: oldPassword, // Gửi mật khẩu cũ chưa mã hóa
          newPassword: newPassword,  // Gửi mật khẩu mới chưa mã hóa
        });
  
      }
  
      Alert.alert("Thành công", "Cập nhật thông tin thành công.");
      navigation.goBack();
  
    } catch (error) {
      console.log(error);
      Alert.alert("Thông báo!", "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <View style={globalStyles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.header}>
            <StatusBar animated backgroundColor={appColors.primary} />
            <RowComponent onPress={handleNavigation} styles={{ columnGap: 25 }}>
              <Ionicons name="chevron-back" size={26} color="white" />
              <Text style={styles.headerTitle}>Chỉnh sửa cá nhân</Text>
            </RowComponent>
          </View>
          <View style={styles.body}>
            <View style={{ alignItems: "center" }}>
              <Image style={{ width: 150, height: 150 }} source={require('../../../assets/images/profileAVT.png')} />
            </View>
            <InputComponent
              placeholder="Tên của bạn"
              value={name}
              onChange={(text) => setName(text)}
              suffix={<User size={22} color={appColors.gray} />}
            />
            <InputComponent
              placeholder="Email"
              editable={false}
              value={email}
              onChange={(text) => setEmail(text)}
              suffix={<Sms size={22} color={appColors.gray} />}
            />
            <InputComponent
              value={oldPassword}
              placeholder="Nhập mật khẩu cũ"
              onChange={setOldPassword}
              isPassword
              allowClear
              affix
            />
            <InputComponent
              value={newPassword}
              placeholder="Nhập mật khẩu mới"
              onChange={setNewPassword}
              isPassword
              allowClear
              affix
            />
            <InputComponent
              value={reNewPassword}
              placeholder="Xác nhận mật khẩu mới"
              onChange={setReNewPassword}
              isPassword
              allowClear
              affix
            />
            <ButtonComponent text="Lưu thông tin" type="primary" onPress={() => handleEditProfile()} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: appColors.primary,
    paddingTop: Platform.OS === "ios" ? 66 : 22,
  },
  headerTitle: {
    color: appColors.white2,
    fontSize: 22,
    fontWeight: "500",
  },
  body: {
    rowGap: 20,
    marginTop: 40,
    paddingHorizontal: 15,
  },
});
