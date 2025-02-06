import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ButtonComponent, TextComponent } from '@/app/Components'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const ProfileHeader = () => {
  return (
    <View style={{flex:1}}>
      <View style={styles.profileAVTContainer}>
          <Image style={styles.profileAVT} source={require('../../../assets/images/profileAVT.png')}></Image>
        </View>
        <View style={styles.nameContainer}>
          <TextComponent
            text="si dep trai hehe"
            styles={styles.name}
          />
        </View>

        <View style={styles.followContainer}>
          <View></View>
          <View></View>
          <View style={styles.followingAndFollowerContainer}>
            <TextComponent
              text='350'
              styles={styles.followCount}
            />
            <TextComponent
              text='Following'
              styles={styles.followText}
            />
          </View>

          <View>
            <Image source={require('../../../assets/images/Line59.png')}></Image>
          </View>

          <View style={styles.followingAndFollowerContainer}>
            <TextComponent
              text='346'

              styles={styles.followCount}
            />
            <TextComponent
              text='Followers'
              styles={styles.followText}
            />
          </View>
          <View></View>
          <View></View>
        </View >
       
    </View>
  )
}

export default ProfileHeader

const styles = StyleSheet.create({

    profileAVTContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 58
      },
      profileAVT: {
        width: 96,
        height: 96,
      },
      nameContainer: {
        width: '100%',
      
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
      },
      name: {
        fontSize: 24,
        lineHeight: 31.25,
        fontWeight: '600',
      },
      followContainer: {
        width: '100%',
        
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20
      },
      followingAndFollowerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 61,
        height: 54,
    
      },
      followCount: {
        fontSize: 16,
        lineHeight: 34,
        fontWeight: '600'
      },
      followText: {
        fontSize: 14,
        lineHeight: 23,
        color: '#747688'
      },

})
