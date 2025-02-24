import {
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "@/app/constants/globalStyles";
import { appColors } from "@/app/constants/appColors";
import {
  CircleComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from "@/app/components";
import {
  ArrowRight2,
  HambergerMenu,
  SearchNormal1,
  Sort,
} from "iconsax-react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { fontFamilies } from "@/app/constants/fontFamilies";
import CategoriesList from "@/app/components/CategoriesList";
import EventItem from "@/app/components/EventItem";
import { AxiosInstance } from "@/app/services";

const ExploreScreen = ({navigation}) => {
  const [eventsIscoming, setEventsIscoming] = useState([]);
  const [eventsUpcoming, setEventsUpcoming] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const response = await AxiosInstance().get("events/all");
      const now = Date.now();

      const ongoingEvents = response.data.filter(eventItem => now >= eventItem.timeStart && now <= eventItem.timeEnd);
      setEventsIscoming(ongoingEvents)
      const upcomingEvents = response.data.filter(eventItem => eventItem.timeStart > now);
      setEventsUpcoming(upcomingEvents);

    };
    getEvents();
    return () => {
      setEventsIscoming([]);
      setEventsUpcoming([]);
    };
  }, []);

  

  

  return (
    <ScrollView nestedScrollEnabled style={globalStyles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={appColors.primary}
      />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: 178 + (Platform.OS === "ios" ? 16 : 0),
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 52,
        }}>
        <View style={{ marginBottom: 7, paddingHorizontal: 16 }}>
          <RowComponent>
            <TouchableOpacity>
              <HambergerMenu size={24} color={appColors.white} />
            </TouchableOpacity>
            <View style={[{ flex: 1, alignItems: "center" }]}>
              <RowComponent>
                <TextComponent
                  text="Vị trí hiện tại của bạn"
                  color={appColors.white2}
                  size={12}
                />
              </RowComponent>
              <TextComponent
                text="Hồ Chí Minh, Việt Nam"
                flex={0}
                color={appColors.white}
                font={fontFamilies.medium}
                size={13}
              />
            </View>

            <CircleComponent color="#524CE0" size={36}>
              <View>
                <MaterialIcons
                  name="notifications"
                  size={24}
                  color={appColors.white}
                />
                <View
                  style={{
                    backgroundColor: "#02E9FE",
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: "#524CE0",
                    position: "absolute",
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleComponent>
          </RowComponent>
          <SpaceComponent height={24} />
          <RowComponent>
            <RowComponent styles={{ flex: 1 }}>
              <SearchNormal1
                variant="TwoTone"
                size={22}
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  height: 18,
                  marginHorizontal: 12,
                  backgroundColor: "#A29EF0",
                }}
              />
              <TextComponent text="Tìm kiếm..." color={`#A29EF0`} flex={1} />
            </RowComponent>
            <RowComponent
              styles={{
                backgroundColor: "#5D56F3",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 100,
              }}>
              <CircleComponent size={19.3} color={`#A29EF0`}>
                <Sort size={12} color={appColors.primary} />
              </CircleComponent>
              <SpaceComponent width={8} />
              <TextComponent text="Lọc" color={appColors.white} />
            </RowComponent>
          </RowComponent>
        </View>
        <View>
          <CategoriesList isColor={true} />
        </View>
        
      </View>
      <ScrollView
        nestedScrollEnabled
        style={[
          {
            flex: 1,
            paddingTop: 40,
            paddingHorizontal: 12,
          },
        ]}>
        <View style={[globalStyles.row, { marginTop: 15, justifyContent: "space-between" }]}>
          <TextComponent text="Sự kiện đang diễn ra" size={18} title />
          <RowComponent onPress={() => {}}>
            <TextComponent text="Xem thêm" size={16} color={appColors.gray} />
            <ArrowRight2 variant="Bold" size={14} color={appColors.gray} />
          </RowComponent>
        </View>

        <FlatList
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          data={eventsIscoming}
          renderItem={({ item }) => <EventItem onPress={() => {
            navigation.navigate("Detail", {
              id: item._id
            })
          }} type="card" item={item} />}
        />

        <View style={[globalStyles.row, { marginTop: 15, justifyContent: "space-between" }]}>
          <TextComponent text="Sự kiện sắp diễn ra" size={18} title />
          <RowComponent onPress={() => {}}>
            <TextComponent text="Xem thêm" size={16} color={appColors.gray} />
            <ArrowRight2 variant="Bold" size={14} color={appColors.gray} />
          </RowComponent>
        </View>

        <FlatList
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          data={eventsUpcoming}
          renderItem={({ item }) => <EventItem onPress={() => {
            navigation.navigate("Detail", {
              id: item._id
            })
          }} type="card" item={item} />}
        />
      </ScrollView>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({});
