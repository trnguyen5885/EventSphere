import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'

const AddEventInfo = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Thêm sự kiện</Text>
      <View style={styles.headerSectionContainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.headerSectionIndex}>
            <Text style={styles.headerSectionIndexNumber}>1</Text>
          </View>

        </View>
        {/* line */}
        <View style={styles.headerSectionLine}></View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.headerSectionIndex}>
            <Text style={styles.headerSectionIndexNumber}>2</Text>
          </View>

        </View>

        {/* line */}
        <View style={styles.headerSectionLine}></View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.headerSectionIndex}>
            <Text style={styles.headerSectionIndexNumber}>3</Text>
          </View>

        </View>
      </View>
      <View style={styles.headerSectionTitleContainer}>
        <View>
          <Text style={styles.headerSectionTitle}>Thông tin</Text>
        </View>
        <View>
          <Text style={styles.headerSectionTitle}>  Tạo vé</Text>
        </View>
        <View>
          <Text style={styles.headerSectionTitle}>Thanh toán</Text>
        </View>
      </View>
      <View style={styles.addSectionBackgroundContainer}>
        <TouchableOpacity style={styles.addImageBackgroundSection}>
          <View>
            <Image source={require('../../../assets/images/event_background_example.png')}></Image>
          </View>
          <View style={styles.addImageBackgroundSectionTitle}>
            <Text style={styles.addImageBackgroundSectionTitleText}>Thêm ảnh nền sự kiện</Text>
            <Text style={styles.addImageBackgroundSectionTitleSize}>(1280x720)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addImageBackgroundSection}>
          <View>
            <Image source={require('../../../assets/images/event_background_example.png')}></Image>
          </View>
          <View style={styles.addImageBackgroundSectionTitle}>
            <Text style={styles.addImageBackgroundSectionTitleText}>Thêm logo  sự kiện</Text>
            <Text style={styles.addImageBackgroundSectionTitleSize}>(720x958)</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.addSectionBackgroundContainer}>
          <Text style={styles.addInfoSectionTitle}>Tên sự kiện</Text>
          <TextInput style={styles.inputFiled} placeholder='Tên sự kiện'></TextInput>
          <Text style={styles.addInfoSectionTitle}>Địa chỉ sự kiện</Text>
          <Text style={styles.addInfoSectionTitle}>Tên địa điểm</Text>
          <TextInput style={styles.inputFiled} placeholder='Tên địa điểm'></TextInput>
          <Text style={styles.addInfoSectionTitle}>Tỉnh/Thành</Text>
          <TextInput style={styles.inputFiled} placeholder='Tỉnh/Thành'></TextInput>
          <Text style={styles.addInfoSectionTitle}>Quận/Huyện</Text>
          <TextInput style={styles.inputFiled} placeholder='Quận/Huyện'></TextInput>
          <Text style={styles.addInfoSectionTitle}>Phường/Xã</Text>
          <TextInput style={styles.inputFiled} placeholder='Phường/Xã'></TextInput>
          <Text style={styles.addInfoSectionTitle}>Số nhà/Đường</Text>
          <TextInput style={styles.inputFiled} placeholder='Số nhà/Đường'></TextInput>
      </View>
    </View>
    </ScrollView>
  )
}

export default AddEventInfo

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 14,
    backgroundColor: '#FCFCFC',
  },
  headerTitle: {
    fontSize: 29,
    fontWeight: '400',
    width: '100%',
    textAlign: 'center'
  },
  headerSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 12
  },
  headerSectionIndex: {
    backgroundColor: '#5669FF',
    width: 40,
    height: 40,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSectionIndexNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSectionLine: {
    borderWidth: 1,
    borderColor: '#5669FF',
    backgroundColor: '#5669FF',
    width: 90,
    height: 5,
    borderRadius: 10,
    opacity: 0.1
  },
  headerSectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
  headerSectionTitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  addSectionBackgroundContainer: {
    borderRadius: 30,
    borderColor: '#5669FF',
    borderWidth: 2,
    padding: 20,
    marginVertical:10
  },
  addImageBackgroundSection:{
    backgroundColor:'white',
    padding:10,
    borderRadius:20,
    marginVertical:10
  },
  addImageBackgroundSectionTitle: {
    fontSize: 16,
    marginVertical:30,
    justifyContent:'center',
    alignItems:'center'
  },
  addImageBackgroundSectionTitleText:{
    fontSize:16,
    fontWeight:400
  },
  addImageBackgroundSectionTitleSize:{
      fontSize:18,
      fontWeight:'bold'
  },
  addInfoSectionTitle: {
    fontSize:18,
    fontWeight:'bold',
    marginVertical:5
  },
  inputFiled: {
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius:15,
      marginVertical:10,
      paddingHorizontal:10,
  },

})