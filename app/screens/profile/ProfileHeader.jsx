import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { ButtonComponent, TextComponent } from '@/app/components'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';

const ProfileHeader = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // goi API lay user
    useEffect(() => {
      fetch('http://192.168.100.2:3000/users/6773f04f19073b07dc2f9e3a')
        .then(response => response.json())
        .then(data => {
          if(data.status){
            setUsers(data.data);
          }
        })
        .catch(error => console.error('loi khi goi API: ', error))
        .finally(() => setLoading(false));
    }, []);
  return (
    <View >
      <View style={styles.profileAVTContainer}>
          <Image style={styles.profileAVT} source={require('../../../assets/images/profileAVT.png')}></Image>
        </View>
        <View style={styles.nameContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#5669FF" />
        ) : (
          <TextComponent text={users ? users.username : 'Không có dữ liệu'} styles={styles.name} />
        )}
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
        marginTop: 0
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
        width: 'auto',
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
