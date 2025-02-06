import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import authenticationAPI from '@/app/apis/authApi/authenticationAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '@/app/Components';
import { Lock, Sms, User } from 'iconsax-react-native';
import { appColors } from '@/app/constants/appColors';
import SocialLogin from './Components/SocialLogin';
import LoadingModal from '@/app/modals/LoadingModal';
import { Validate } from '@/app/utils/Validate';

const initValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 3
};

const RegisterScreen = ({navigation}:any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  useEffect(() => {
    if(values.email || values.password){
      setErrorMessage('');
    }
  }, [values.email, values.password]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};

    data[`${key}`] = value;

    setValues(data);
  };

  const validateForm = () => {
    const errors = {};
    return errors;
  };

  const handleRegister = async () => {
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication('/register', values, 'post');
      if(res.status === 200 || res.status === 201){
        await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        alert('Registration successful! Redirecting to login screen...');
        navigation.navigate('Login');
      }
      if(res.status === 400){
        alert('Email exist!');
      }
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ContainerComponent isImageBackground isScroll back>
        <SectionComponent>
          <TextComponent size={24} title text="Sign in" />
          <SpaceComponent height={21} />
          <InputComponent
            value={values.username}
            placeholder="Username"
            onChange={val => handleChangeValue('username', val)}
            allowClear
            affix={<User size={22} color={appColors.gray} />}
          />
          <InputComponent
            value={values.email}
            placeholder="@abc@gmail.com"
            onChange={val => handleChangeValue('email', val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
            onEnd={()=>
              setErrorMessage({ ...errorMessage, email: 'Email không hợp lệ' })}
          />
          <InputComponent
            value={values.password}
            placeholder="Password"
            onChange={val => handleChangeValue('password', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
          />
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm Password"
            onChange={val => handleChangeValue('confirmPassword', val)}
            isPassword
            allowClear
            affix={<Lock size={22} color={appColors.gray} />}
          />

        </SectionComponent>

        {errorMessage && (
          <SectionComponent>
            {
              Object.keys(errorMessage).map((error, index) => (
              <TextComponent 
                text={errorMessage[`${error}`]}
                key={`error${index}`} 
                color={appColors.danger} />
            ))}
          </SectionComponent>
        )}

        <SpaceComponent height={16} />
        <SectionComponent>
          <ButtonComponent onPress={handleRegister} text="SIGN UP" type='primary' />
        </SectionComponent>

        <SocialLogin />
        
        <SectionComponent>
          <RowComponent justify="center">
            <TextComponent text="Don't have an account?" />
            <ButtonComponent type="link" text="Sign up" onPress={() => navigation.navigate('Login')} />
          </RowComponent>
        </SectionComponent>
        <LoadingModal visible={isLoading} />
      </ContainerComponent>
    </>
  );
}

export default RegisterScreen

const styles = StyleSheet.create({})