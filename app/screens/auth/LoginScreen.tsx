import React, { useEffect, useState } from "react";
import { View, Switch, Text, Image, Dimensions } from "react-native";
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
} from "@/app/components/index";
import authenticationAPI from "../../apis/authApi/authenticationAPI";
import SocialLogin from "./Components/SocialLogin";
import LoadingModal from "@/app/modals/LoadingModal";

const LoginScreen = ({ navigation }: any) => {
  const [useId, setUseId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    // Kiểm tra email hợp lệ hay không
    if (val === "") {
      setPasswordError("Mật khẩu không được để trống.");
    } else if (val.length <= 8 || val.length >= 32) {
      setPasswordError("Mật khẩu phải có từ 8 - 32 ký tự.");
    } else {
      setPasswordError("");
    }
  };

  // Lấy dữ liệu từ AsyncStorage khi mở app
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPassword = await AsyncStorage.getItem("password");
        const storedRemember = await AsyncStorage.getItem("isRemember");

        if (storedRemember === "true" && storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
          setIsRemember(true);
        }
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu:", error);
      }
    };

    loadStoredData();
  }, []);

  const handleLogin = async () => {
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
        const token = res.data.token;
        setUseId(userId);
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("token", token);

        //  Chỉ lưu email & password nếu "Remember Me" được bật & đăng nhập thành công
        if (isRemember) {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
          await AsyncStorage.setItem("isRemember", "true");
        } else {
          await AsyncStorage.removeItem("email");
          await AsyncStorage.removeItem("password");
          await AsyncStorage.setItem("isRemember", "false");
        }

        navigation.navigate("Drawer");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // hàm đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
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
        <RowComponent justify="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{ true: appColors.primary }}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => {
                setIsRemember(!isRemember);
              }}
            />
            <TextComponent text="Remember me" />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
            type="text"
          />
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={16} />
      <SectionComponent>
        <ButtonComponent
          onPress={handleLogin}
          text="SIGN IN"
          type="primary"
          disable={!email || !password || !!emailError || !!passwordError}
        />
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
