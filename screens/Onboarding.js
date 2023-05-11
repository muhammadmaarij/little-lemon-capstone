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
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

export default function Onboarding({navigation, route}) {
  const {onComplete} = route.params;
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    emailAddress: '',
  });

  const validateName = text => {
    // check if input is empty or contains non-string characters
    const regex = /^[a-zA-Z]+$/;
    if (text.trim().length === 0 || !regex.test(text)) {
      setFirstName('');
      console.log('not valid');

      return;
    }
    setFirstName(text);
  };

  const validateEmail = text => {
    // check if input is a properly formatted email address
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(text)) {
      setEmail('');
      console.log('not valid');
      return;
    }
    setEmail(text);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
      </View>
      <View style={{backgroundColor: 'lightgrey', height: height * 0.66}}>
        <Text style={styles.text}>Let us get to know you</Text>
        <KeyboardAvoidingView
          style={{flex: 1}}
          // behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
          behavior="padding"
          keyboardVerticalOffset={65}>
          <View style={{marginTop: 40}}>
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
          </View>
        </KeyboardAvoidingView>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          validateName(firstName);
          validateEmail(email);
          onComplete();
          setUserDetails({
            firstName,
            email,
          });
          AsyncStorage.setItem(
            'setUserDetails',
            JSON.stringify({firstName, email}),
          );
          navigation.navigate('Profile');
          console.log(userDetails);
        }}
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
    height: height * 0.13,
    width: width,
    backgroundColor: '#EDEFEE',
  },
  logo: {
    height: height * 0.1,
    width: width * 0.65,
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 28,
    alignSelf: 'center',
    marginTop: 40,
    fontWeight: '600',
  },
  input: {
    borderWidth: 3,
    borderRadius: 10,
    width: width * 0.75,
    alignSelf: 'center',
    marginTop: 15,
  },
  button: {
    height: 45,
    width: width * 0.3,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 30,
    marginLeft: 250,
  },
});
