import React, { useEffect, useState } from "react";
import { View, Switch, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appColors } from "../../constants/appColors";
import { Lock, Sms } from "iconsax-react-native";
import {
  ContainerComponent,
  SectionComponent,
  TextComponent,
  RowComponent,
  ButtonComponent,
  SpaceComponent,
  InputComponent,
} from "../../Components/index";
import authenticationAPI from "../../apis/authApi/authenticationAPI";
import SocialLogin from "./Components/SocialLogin";

const LoginScreen = ({ navigation }: any) => {
  const [useId, setUseId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 🔹 Load email & password nếu "Remember Me" đã được bật
  useEffect(() => {
    const loadRememberedLogin = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await AsyncStorage.getItem("savedPassword");
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setIsRemember(true);
        }
      } catch (error) {
        console.log("❌ Lỗi khi tải thông tin đăng nhập đã lưu:", error);
      }
    };
    loadRememberedLogin();
  }, []);

  const validateInputs = () => {
    let isValid = true;
    if (!email.trim()) {
      setEmailError("Vui lòng nhập email");
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Email không hợp lệ");
        isValid = false;
      } else {
        setEmailError("");
      }
    }

    if (!password.trim()) {
      setPasswordError("Vui lòng nhập mật khẩu");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    const body = { email, password };
    try {
      const res = await authenticationAPI.HandleAuthentication(
        "/login",
        body,
        "post",
      );

      if (res.status === 200 || res.status === 201) {
        const userId = res.data.id;
        setUseId(userId);
        await AsyncStorage.setItem("userId", userId);

        // 🔹 Lưu email & password nếu "Remember Me" được bật
        if (isRemember) {
          await AsyncStorage.setItem("savedEmail", email);
          await AsyncStorage.setItem("savedPassword", password);
        } else {
          await AsyncStorage.removeItem("savedEmail");
          await AsyncStorage.removeItem("savedPassword");
        }

        navigation.navigate("Welcome");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent>
        <RowComponent>
          <Image
            style={{ width: 162, height: 114 }}
            source={require("@/assets/images/icon-avatar.png")}
          />
        </RowComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={16} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => {
            setEmail(val);
            setEmailError("");
          }}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        {emailError ? <TextComponent color="red" text={emailError} /> : null}
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => {
            setPassword(val);
            setPasswordError("");
          }}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
        {passwordError ? (
          <TextComponent color="red" text={passwordError} />
        ) : null}
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remember me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate("ForgotPassword")}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent onPress={handleLogin} text="SIGN IN" type="primary" />
      </SectionComponent>
      {/* <SocialLogin /> */}
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account?" />
          <ButtonComponent
            type="link"
            text=" Sign up"
            onPress={() => navigation.navigate("Register")}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
