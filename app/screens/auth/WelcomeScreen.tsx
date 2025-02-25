import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { globalStyles } from "@/app/constants/globalStyles";
import { SpaceComponent } from "@/app/Components";
import { appColors } from "@/app/constants/appColors";

const WelcomeScreen = () => {
  return (
    <ImageBackground
      style={globalStyles.container}
      source={require("../../../assets/images/splash-img.png")}
      imageStyle={{ flex: 1 }}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{
          width: Dimensions.get("window").width * 0.7,
          resizeMode: "contain",
        }}
      />
      <SpaceComponent height={20} />
      <ActivityIndicator color={appColors.gray} size={22} />
    </ImageBackground>
  );
};

export default WelcomeScreen;
