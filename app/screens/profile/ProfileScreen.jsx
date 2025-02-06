import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ButtonComponent, RowComponent, TextComponent } from '@/app/Components'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProfileHeader from './ProfileHeader'

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};
const ProfileScreen = () => {
  const interest = ["Games Online", "Concert", "Music", "Art", "Movie", "Others"];
  return (
    <ScrollView>
      <View style={styles.container}>
       <RowComponent justify='space-between' styles={{width:'100%'}}>
       <ButtonComponent
          text='Profile'
          textColor='black'
          textStyles={{ fontWeight: 'bold', fontSize: 24 }}
          icon={<Ionicons name="arrow-back" size={22} color="black" />}
          iconFlex='left'
          type='primary'
          styles={styles.backButton}
        />
       </RowComponent>

        <ProfileHeader />

        
        <View style={styles.editBtnContainer}>
          <ButtonComponent
            text='Edit'
            textStyles={{ fontSize: 24, color: '#5669FF', margin: 0 }}
            icon={<MaterialCommunityIcons name="square-edit-outline" size={24} color="#5669FF" />}
            iconFlex='left'
            type='primary'
            styles={styles.editBtn}
          />
        </View>
        <TextComponent
          text='About Me'
          styles={styles.aboutMeTitle} />
        <View style={styles.aboutMeContainer}>
          <View style={styles.aboutMeContentContainer}>
            <TextComponent
              text='Enjoy your favorite dishe and a lovely your friends and family and have a great time.
              Food from local food trucks will be available for purchase.'
              styles={styles.aboutMeContent}
            />
            <View>
              <ButtonComponent
                text='Read More.'
                icon={<Fontisto name="angle-down" size={5} color="#5669FF" />}
                iconFlex='right'
                type='link'
                styles={styles.readMoreBtn}
              />
            </View>
          </View>
        </View>


        <View>
          <View style={styles.interestContainer}>
            <TextComponent
              text='Interest'
              styles={styles.interestText}
            />
            <ButtonComponent
              text='CHANGE'
              textStyles={{ color: '#5669FF' }}
              icon={<Feather name="edit-3" size={9} color="#5669FF" />}
              iconFlex='left'
              type='primary'
              styles={styles.changeBtn}
            />
          </View>
        </View>

        <View style={styles.interestBtnContainer}>
          {interest.map((item, index) => (
            <ButtonComponent
              key={index}
              text={item}
              type="primary"
              styles={[styles.interestBtn, { backgroundColor: getRandomColor() }]}
              textStyles={styles.interestTitle}
            />
          ))}
        </View>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    backgroundColor: "white",
    boxShadow: 'none',

  },
  editBtnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 21
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
    backgroundColor:'white'
  },
  aboutMeContainer: {
    marginTop: 25,
  },
  aboutMeTitle: {
    fontSize: 18,
    lineHeight: 34,
    fontWeight: '500',
  },
  aboutMeContent: {
    fontSize: 16,
    lineHeight: 25
  },
  aboutMeContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  readMoreBtn: {
    padding: 0,
    marginLeft: 8,
  },
  interestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  interestText: {
    fontSize: 18,
    lineHeight: 34,
    fontWeight: '500'
  },
  changeBtn: {
    width: 'auto',
    height: 28,
    flexDirection: 'row',
    backgroundColor: '#5669FF25',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  interestBtnContainer: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',

  },
  interestBtn: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,

  },
  interestTitle: {
    fontSize: 16,
    lineHeight: 25,
    color: '#ffffff',
    whiteSpace: 'nowrap'
  },
})

export default ProfileScreen