import { View, Text, FlatList } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RowComponent, SpaceComponent, TextComponent } from ".";
import { globalStyles } from "../constants/globalStyles";
import { appColors } from "../constants/appColors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AxiosInstance } from "../services";

interface Props {
  isColor?: boolean;
}

interface Category {
  _id: string;
  name: string;
}

const CategoriesList = (props: Props) => {
  const { isColor } = props;
  const [categories, setCategories] = useState<Category[] | undefined>([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await AxiosInstance().get("categories/all");
      setCategories(response.data);
    };
    getCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  const colors = ["#EE544A", "#F59762", "#29D697", "#46CDFB", "#33FFDD"];
  const getEventIcon = (id: any) => {
    const icons = [
      "sports-baseball",
      "music-note",
      "fastfood",
      "videogame-asset",
      "biotech",
    ];
    const index = (id - 1) % icons.length;
    return icons[index];
  };

  const renderTagCategory = ({ item, index }: any) => {
    const color = colors[index % colors.length];
    const iconName = getEventIcon(index + 1);
    return (
      <RowComponent
        onPress={() => {}}
        styles={[
          [
            globalStyles.tag,
            {
              backgroundColor: color,
            },
          ],
        ]}>
        <MaterialIcons
          name={iconName}
          size={24}
          color={isColor ? appColors.white : color}
        />
        <SpaceComponent width={8} />
        <TextComponent
          text={item.name}
          styles={{
            color: isColor ? appColors.white : color,
          }}
        />
      </RowComponent>
    );
  };

  return (
    <FlatList
      style={{ paddingHorizontal: 16 }}
      showsHorizontalScrollIndicator={false}
      horizontal
      nestedScrollEnabled
      data={categories}
      renderItem={renderTagCategory}
      keyExtractor={item => item._id}
    />
  );
};

export default CategoriesList;
