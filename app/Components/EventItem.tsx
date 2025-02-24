import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { CardComponent, TextComponent } from "../components";
import { appColors } from "../constants/appColors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatDate } from "../services";
import { formatPrice } from "../services/utils/price";

interface Props {
  item: any;
  type: "list" | "card";
  onPress?: () => void;
}

const EventItem = (props: Props) => {
  const { item, type, onPress } = props;

  return type === "card" ? (
    <CardComponent
      onPress={onPress}
      styles={{
        width: Dimensions.get("window").width * 0.7,
        alignItems: "flex-start",
      }}>
      <Image
        style={{
          width: "100%",
          height: 130,
          objectFit: "cover",
          borderRadius: 15,
        }}
        source={{ uri: item.images[0] }}
      />
      <TextComponent
        numberOfLine={2}
        title
        size={18}
        text={item.name}
        styles={{ marginTop: 5 }}
      />
      <TextComponent
        text={`Từ ${formatPrice(item.ticketPrice)}`}
        styles={{ fontSize: 17, fontWeight: "bold", color: appColors.primary }}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",

          marginTop: 5,
        }}>
        <Text>{`${formatDate(item.timeStart)} - `}</Text>
        <Text>{formatDate(item.timeEnd)}</Text>
      </View>
    </CardComponent>
  ) : (
    <></>
  );
};

export default EventItem;
