import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "@/app/components";
import { TextInput } from "react-native-gesture-handler";
import { appColors } from "@/app/constants/appColors";
import { fontFamilies } from "@/app/constants/fontFamilies";
import { useRoute } from "@react-navigation/native";

const VertificationScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { email } = route.params as { email: string };
  const [currentCode, setCurrentCode] = useState<string>("");
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState("");
  const [limit, setLimit] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = ``;

    codeValues.forEach(val => (item += val));

    setNewCode(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;

    setCodeValues(data);
  };

  const handleResendVerification = async () => {
    setCodeValues(["", "", "", ""]);
    setNewCode("");

    // const api = `/verification`;
    setIsLoading(true);
    try {
      //   const res: any = await authenticationAPI.HandleAuthentication(
      //     api,
      //     { email },
      //     "post",
      //   );

      setLimit(30);
      // setCurrentCode(res.data.code);
      setIsLoading(false);

      //   console.log(res.data.code);
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not send verification code ${error}`);
    }
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessage("Invalid code!!!");
      } else {
        setErrorMessage("");

        // const api = `/register`;
        // const data = {
        //   email,
        //   password,
        //   username: username ?? '',
        // };

        try {
          // const res: any = await authenticationAPI.HandleAuthentication(
          //   api,
          //   data,
          //   'post',
          // );
          // dispatch(addAuth(res.data));
          // await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessage("User has already exist!!!");
          console.log(`Can not create new user ${error}`);
        }
      }
    } else {
      setErrorMessage("Time out verification code, please resend new code!!!");
    }
  };

  return (
    <ContainerComponent back isImageBackground>
      <SectionComponent>
        <TextComponent text="Vertification" title />
        <TextComponent
          text={`We've send you the vertification code on ${email}`}
        />
        <SpaceComponent height={26} />
        <RowComponent justify="space-around">
          <View style={styles.inputContainer}>
            <TextInput
              ref={ref1}
              keyboardType="number-pad"
              style={styles.input}
              placeholder="-"
              maxLength={1}
              onChangeText={val => {
                val.length > 0 && ref2.current.focus();
                handleChangeCode(val, 0);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={ref2}
              keyboardType="number-pad"
              style={styles.input}
              placeholder="-"
              maxLength={1}
              onChangeText={val => {
                handleChangeCode(val, 1);
                val.length > 0 && ref3.current.focus();
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={ref3}
              keyboardType="number-pad"
              style={styles.input}
              placeholder="-"
              maxLength={1}
              onChangeText={val => {
                handleChangeCode(val, 2);
                val.length > 0 && ref4.current.focus();
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={ref4}
              keyboardType="number-pad"
              style={styles.input}
              placeholder="-"
              maxLength={1}
              onChangeText={val => {
                handleChangeCode(val, 3);
              }}
            />
          </View>
        </RowComponent>
      </SectionComponent>
      <SpaceComponent height={40} />
      <SectionComponent>
        <ButtonComponent
          disable={newCode.length !== 4}
          onPress={handleResendVerification}
          text="Continue"
          type="primary"
        />
      </SectionComponent>
      {errorMessage && (
        <SectionComponent>
          <TextComponent
            styles={{ textAlign: "center" }}
            text={errorMessage}
            color={appColors.danger}
          />
        </SectionComponent>
      )}
      <SectionComponent>
        {limit > 0 ? (
          <RowComponent justify="center">
            <TextComponent text="Re-send code in  " flex={0} />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60}:${
                limit - (limit - (limit % 60))
              }`}
              flex={0}
              color={appColors.link}
            />
          </RowComponent>
        ) : (
          <RowComponent>
            <ButtonComponent
              type="link"
              text="Resend email verification"
              onPress={handleResendVerification}
            />
          </RowComponent>
        )}
      </SectionComponent>
    </ContainerComponent>
  );
};

export default VertificationScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 55,
    lineHeight: 55,
    borderRadius: 12,
    borderWidth: 1,
    padding: 0,
    borderColor: appColors.gray2,
  },
  input: {
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    textAlign: "center",
  },
});
