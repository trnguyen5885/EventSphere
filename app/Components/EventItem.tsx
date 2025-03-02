import {
  View,
  Text,
  Dimensions,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import { CardComponent, TextComponent } from "../components";
import { appColors } from "../constants/appColors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { formatDate } from "../services";
import { formatPrice } from "../services/utils/price";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../constants/globalStyles";

interface Props {
  item: any;
  type: "list" | "card";
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const EventItem = (props: Props) => {
  const { item, type, styles, onPress } = props;

  return type === "card" ? (
    <CardComponent
      onPress={onPress}
      styles={[
        {
          width: Dimensions.get("window").width * 0.7,
          alignItems: "flex-start",
        },
        styles,
      ]}>
      <Image
        style={{
          width: "100%",
          height: 130,
          objectFit: "cover",
          borderRadius: 15,
        }}
        source={{ uri: item.avatar }}
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

      <View style={[globalStyles.row, { marginTop: 5, columnGap: 5 }]}>
        <View>
          <Ionicons name="calendar" size={18} color={appColors.primary} />
        </View>
        <View style={globalStyles.row}>
          <Text>{`${formatDate(item.timeStart)} - `}</Text>
          <Text>{formatDate(item.timeEnd)}</Text>
        </View>
      </View>
    </CardComponent>
  ) : (
    <></>
  );
};

export default EventItem;
