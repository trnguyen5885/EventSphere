import React, { useEffect, useState } from "react";
import { View, Button, Image, Text, Alert } from "react-native";
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
} from "@/app/components";
import { Switch } from "react-native-gesture-handler";
import SocialLogin from "./Components/SocialLogin";
import authenticationAPI from "../../apis/authApi/authenticationAPI";
import { Validate } from "../../utils/Validate";
import LoadingModal from "@/app/modals/LoadingModal";
// import { addAuth } from '../../redux/reducers/authReducer';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    const emailValidation = Validate.email(email);
    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleAuthentication(
          "/login",
          { email, password },
          "post",
        );
        console.log(res.data);

        await AsyncStorage.setItem(
          "auth",
          isRemember ? JSON.stringify(res.data) : email,
        );
        if (res.status === 200 || res.status === 201) {
          alert("Registration successful! Redirecting to login screen...");
          navigation.navigate("BottomTab");
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Email is not correct");
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: "center",
          alignItems: "center",
        }}
        children={undefined}></SectionComponent>

      <SectionComponent>
        <TextComponent size={24} title text="Sign in" />
        <SpaceComponent height={16} />
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          // isPassword
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
          isPassword
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
        />
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
      <SocialLogin />
      <SectionComponent>
        <RowComponent justify="center">
          <TextComponent text="Don't have an account?" />
          <ButtonComponent
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate("Register")}
          />
        </RowComponent>
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default LoginScreen;
