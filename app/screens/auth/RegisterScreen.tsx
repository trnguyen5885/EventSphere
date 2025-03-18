import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import authenticationAPI from "@/app/apis/authApi/authenticationAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "@/app/components";

import { Lock, Sms, User } from "iconsax-react-native";
import { appColors } from "@/app/constants/appColors";
import SocialLogin from "./Components/SocialLogin";
import LoadingModal from "@/app/modals/LoadingModal";

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUsernameChange = (val: string) => {
    setUsername(val);

    if (val === "") {
      setUsernameError("Tên người dùng không được để trống.");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(val)) {
      setUsernameError(
        "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới (_).",
      );
      return;
    }

    setUsernameError("");
  };

  const handleEmailChange = (val: string) => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(val);

    // Kiểm tra email hợp lệ hay không
    if (val === "") {
      setEmailError("Email không được để trống.");
    } else if (!EMAIL_REGEX.test(val)) {
      setEmailError("Email không hợp lệ.");
    } else {
      setEmailError("");
    }
  };

  const handlePassChange = (val: string) => {
    setPassword(val);

    if (val === "") {
      setPasswordError("Mật khẩu không được để trống.");
      return;
    }

    if (val.length < 8 || val.length > 32) {
      setPasswordError("Mật khẩu phải có từ 8 - 32 ký tự.");
      return;
    }

    if (!/[A-Z]/.test(val)) {
      setPasswordError("Mật khẩu phải chứa ít nhất một chữ cái in hoa.");
      return;
    }

    if (!/[a-z]/.test(val)) {
      setPasswordError("Mật khẩu phải chứa ít nhất một chữ cái thường.");
      return;
    }

    if (!/\d/.test(val)) {
      setPasswordError("Mật khẩu phải chứa ít nhất một số.");
      return;
    }

    if (!/[@$!%*?&]/.test(val)) {
      setPasswordError(
        "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&).",
      );
      return;
    }

    setPasswordError("");
  };

  const handleConfirmPassChange = (val: string) => {
    setConfirmPassword(val);

    if (val === "") {
      setConfirmPasswordError("Vui lòng nhập lại mật khẩu.");
      return;
    }

    if (val !== password) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setConfirmPasswordError("");
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const body = { username, email, password };
      const res = await authenticationAPI.HandleAuthentication(
        "/register",
        body,
        "post",
      );

      if (res.status === 200 || res.status === 201) {
        navigation.navigate("Login");
      } else if (res.status === 400) {
        console.log("⚠️ Email đã tồn tại!");
      }
    } catch (error) {
      navigation.navigate("Login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent>
          <TextComponent size={24} title text="Sign Up" />
          <SpaceComponent height={21} />
          <InputComponent
            value={username}
            placeholder="Username"
            onChange={handleUsernameChange}
            allowClear
            affix={<User size={22} color={appColors.gray} />}
          />{" "}
          {usernameError ? (
            <TextComponent text={usernameError} size={14} color={"red"} />
          ) : null}
          <InputComponent
            value={email}
            placeholder="@abc@gmail.com"
            onChange={handleEmailChange}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
          />
          {emailError ? (
            <TextComponent text={emailError} size={14} color={"red"} />
          ) : null}
          <InputComponent
            value={password}
            placeholder="Password"
            onChange={handlePassChange}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
          />
          {passwordError ? (
            <TextComponent text={passwordError} size={14} color={"red"} />
          ) : null}
          <InputComponent
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleConfirmPassChange}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
          />
          {confirmPasswordError ? (
            <TextComponent
              text={confirmPasswordError}
              size={14}
              color={"red"}
            />
          ) : null}
        </SectionComponent>
        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent
            onPress={handleRegister}
            text="SIGN UP"
            type="primary"
            disable={
              !!usernameError ||
              !!emailError ||
              !!passwordError ||
              !!confirmPasswordError
            }
          />
        </SectionComponent>

        {/* <SocialLogin /> */}

        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Already have an account?" />
            <ButtonComponent
              type="link"
              text=" Sign in "
              onPress={() => navigation.navigate("Login")}
            />
          </RowComponent>
        </SectionComponent>

        <LoadingModal visible={isLoading} />
      </ContainerComponent>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
