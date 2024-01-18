import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Platform,
  Alert,
} from 'react-native';
import { BaseSettings } from '../config/BaseSettings';
import { fetchApi } from '../config/apiUtil';
import useGetDeviceLocation from '../components/useGetDeviceLocation';
import { getFontSize, deviceBasedDynamicDimension } from '../utils/ScreenMatrix';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); //admin@gmail.com
  const [password, setPassword] = useState(''); //admin@123

  const { deviceCurrentLocation } = useGetDeviceLocation();

  /**
   * Handle OnPress Login 
   * @param email
   * @param password
   * */
  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    /**
     * Network Call
     * */
    fetchApi('post', BaseSettings.endpoints.login, {
      email: email,
      password: password,
    })
      .then(res => {
        /**
       * Handle success response here 
       * Navigate screen after successfully login
       * */
         if(res.success == true)
        {
          navigation.navigate('Home');
        }
        else
        {
          alert('Username or Password is not correct');
        }
      })
      .catch(err => {
        /**
        * Handle failer response here 
        * */
        console.log('🚀 ~ getItem ~ err:', err);
      });
  };

  return (
    <View style={[styles.container, Platform.OS == 'web' && styles.webContainer]}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <View style={styles.webButton}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      {Platform.OS !== 'web' && (
        <Button
          title="Show Location"
          onPress={() => {
            Alert.alert(
              'Location',
              `Latitude: ${deviceCurrentLocation?.lat} Longitude: ${deviceCurrentLocation?.lng}`,
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: deviceBasedDynamicDimension(16, true, 1),
  },
  input: {
    height: deviceBasedDynamicDimension(40, true, 1),
    borderColor: 'gray',
    borderWidth: deviceBasedDynamicDimension(1, true, 1),
    marginBottom: deviceBasedDynamicDimension(10, true, 1),
    paddingLeft: deviceBasedDynamicDimension(10, true, 1),
    width: Platform.OS === 'web' ? '40%' : '100%',
  },
  screenTitle: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  webButton: {
    width: Platform.OS === 'web' ? '40%' : '100%',
  },
  webContainer: {
    alignItems: 'center',
  }
});

export default LoginScreen;
