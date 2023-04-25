import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaskedTextInput} from 'react-native-mask-text';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

function ProfileScreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Retrieve the stored user details from AsyncStorage
    AsyncStorage.getItem('setUserDetails').then(value => {
      const userDetails = JSON.parse(value);
      setFirstName(userDetails.firstName);
      setEmail(userDetails.email);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View
          style={{
            height: 35,
            width: 35,
            backgroundColor: '#495E57',
            borderRadius: 50,
          }}>
          <Icon name="arrow-left" size={26} color="white" />
        </View>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
      </View>
      <View style={{height: height * 0.7}}>
        <Text style={styles.text2}>Personal Information</Text>
        <Text style={styles.text}>Avatar</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Pressable style={styles.button2}>
            <Text style={{fontSize: 15, color: '#EDEFEE'}}>Change</Text>
          </Pressable>
          <Pressable style={styles.button3}>
            <Text>Remove</Text>
          </Pressable>
        </View>
        <View></View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          keyboardVerticalOffset={65}>
          <View style={{marginTop: 15}}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />

            <Text style={styles.text}>Phone number</Text>
            <MaskedTextInput
              mask="9999-9999999"
              style={styles.input}
              value={phone}
              onChangeText={text => setPhone(text)}
              keyboardType="numeric"
              placeholder="03**-*******"
            />
          </View>
        </KeyboardAvoidingView>
      </View>

      <Pressable
        style={styles.button}
        disabled={firstName == '' || email == ''}>
        <Text style={{fontSize: 26, alignSelf: 'center', fontWeight: '600'}}>
          Next
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: height * 0.1,
    width: width,
    flexDirection: 'row',
  },
  logo: {
    height: height * 0.07,
    width: width * 0.5,
    alignSelf: 'center',
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 15,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: width * 0.92,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 20,
    height: height * 0.055,
  },
  button: {
    height: 45,
    width: width * 0.3,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 30,
    marginLeft: 250,
  },
  text2: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
  },
  button2: {
    height: 40,
    width: width * 0.2,
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  button3: {
    height: 40,
    width: width * 0.2,
    backgroundColor: '#EDEFEE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderColor: '#495E57',
    borderWidth: 1,
  },
});

export default ProfileScreen;
