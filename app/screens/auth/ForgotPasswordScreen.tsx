import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "@/app/components";
import { Sms } from "iconsax-react-native";
import { appColors } from "@/app/constants/appColors";

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  // Hàm kiểm tra email hợp lệ
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Xử lý khi người dùng nhập email
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!text) {
      setEmailError("Email không được để trống!");
    } else if (!isValidEmail(text)) {
      setEmailError("Email không hợp lệ! Vui lòng nhập đúng định dạng.");
    } else {
      setEmailError("");
    }
  };

  const handleSend = () => {
    // Chuyển sang màn hình "VerificationScreen" và truyền email
    navigation.navigate("Vertification", { email });
  };
  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent>
          <TextComponent size={24} title text="Quên mật khẩu" />
          <TextComponent text="Please enter email" />
          <SpaceComponent height={26} />
          <InputComponent
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
          />
          {emailError ? (
            <TextComponent text={emailError} size={12} color={"red"} />
          ) : null}
          <SpaceComponent height={40} />
          <ButtonComponent
            onPress={handleSend}
            text="SEND"
            type="primary"
            disable={!!emailError || !email}
          />
        </SectionComponent>
      </ContainerComponent>
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
