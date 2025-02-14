import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileHeader from './ProfileHeader'
import { ButtonComponent, RowComponent } from '@/app/Components'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { FlashList } from "@shopify/flash-list";
// import PagerView from  'react-native-pager-view';

const DATA = [
  {
    id: 1,
    title: 'ABOUT'
  },
  {
    id: 2,
    title: 'EVENT'
  },
  {
    id: 3,
    title: 'REVIEWS'
  }
]
const ProfileAboutScreen = () => {
  const [data, setData] = useState(DATA);
  const [selectedItem, setSelectedItem] = useState(0);
  const renderItem = ({ item, index }) => {
    return (
      <View style={{flex:1}}>
        <ButtonComponent
          type='primary'
          text={item.title}
          textStyles={[
            styles.itemText,
            selectedItem == index && { color: '#5669FF', justifyContent: 'center', alignItems: 'center' }
          ]}
          styles={styles.detailBtn}
          onPress={() => setSelectedItem(index)}
        />
        <View style={styles.placeHolderLine}>
          {selectedItem == index && <View style={styles.line}></View>}
        </View>
      </View>
    )

  }
  return (
    <View style={styles.container}>
      <RowComponent justify='space-between'>
        <ButtonComponent
          text=''
          textColor='black'
          textStyles={{ fontWeight: 'bold', fontSize: 24 }}
          icon={<Ionicons name="arrow-back" size={22} color="black" />}
          iconFlex='left'
          type='primary'
          styles={styles.backButton}
          onPress={() => {
            console.log(123)
          }}
        />
        <ButtonComponent
          text=''
          type='primary'
          icon={<Entypo name="dots-three-vertical" size={18.3} color="black" />}
          iconFlex='left'
          styles={styles.menuBtn}
        />
      </RowComponent>
      <ProfileHeader />
      <View style={styles.editBtnContainer}>
        <ButtonComponent
          text='Follow'
          textStyles={{ fontSize: 24, color: 'white', margin: 0 }}
          icon={<AntDesign name="adduser" size={24} color="white" />}
          iconFlex='left'
          type='primary'
          styles={styles.followBtn}
        />
        <ButtonComponent
          text='Message'
          textStyles={{ fontSize: 24, color: '#5669FF', margin: 0 }}
          icon={<Feather name="message-circle" size={24} color="#5669FF" />}
          iconFlex='left'
          type='primary'
          styles={styles.editBtn}
        />
      </View>
      <View style={styles.editBtnContainer}>
        <FlashList 
                data={data}
                renderItem={renderItem}
                estimatedItemSize={200}
                keyExtractor={item => item.id.toString()}
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                extraData={selectedItem}
            />

        
      </View>
      {/* <PagerView style={styles.pagerView} initialPage={0}>
          <View key="1" style={{width:100, height:50}}>
            <Text>First page</Text>
          </View>
          <View key="2">
            <Text>Second page</Text>
          </View>
        </PagerView> */}
    </View>
  )
}

export default ProfileAboutScreen

const styles = StyleSheet.create({
  pagerView:{
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  backButton: {
    // position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    backgroundColor: "white",
    boxShadow: 'none',
    textAlign: 'left',

  },
  menuBtn: {
    backgroundColor:'none',
    boxShadow: 'none',
    textAlign: 'right',

  },
  editBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 21
  },
  followBtn: {
    width: 154,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    border: '2.5px solid #5669FF',
    borderRadius: 8,
    backgroundColor: '#5669FF'
  },
  editBtn: {
    width: 154,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    border: '2.5px solid #5669FF',
    borderRadius: 8,
    backgroundColor: 'white'
  },
  detailBtn: {
    height: 20,
    minWidth: 51,
    backgroundColor: 'none',
    boxShadow: 'none',
    borderBottomColor: '2.5px solid #5669FF',
    marginBottom: 0,
    
    paddingRight0: 0,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#747688',
    textAlign: 'center'
  },
  placeHolderLine: {
    width: '100%',
    height: 2,

  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#5669FF',
    borderColor: '#5669FF',
    borderWidth: 2,
  }
})