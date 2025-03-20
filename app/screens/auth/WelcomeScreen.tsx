import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonComponent } from "@/app/components";
import { appColors } from "@/app/constants/appColors";

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>

      <ButtonComponent
      type="primary"
      text="djbhdwajd"
      iconFlex="left"
      color={appColors.danger}/>

    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
