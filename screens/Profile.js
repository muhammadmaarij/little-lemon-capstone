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
import SelectMultiple from 'react-native-select-multiple';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('window');

function ProfileScreen({navigation}) {
  const [firstName, setFirstName] = useState('A');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [imageURI, setImageURI] = useState(null);

  // const handleImagePicker = () => {
  //   ImagePicker.showImagePicker({}, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else {
  //       setImageURI(response.uri);
  //     }
  //   });
  // };

  const handleImagePicker = async camera => {
    let options = {
      mediaType: 'photo',
    };
    let response;
    if (camera) {
      response = await launchCamera(options);
    } else {
      response = await launchImageLibrary(options);
    }
    console.log(response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const base64Image = await RNFS.readFile(response.assets[0].uri, 'base64');
      await AsyncStorage.setItem('selectedImage', base64Image);
      setImageURI(response.assets[0].uri);
    }
  };

  const onSelectionsChange = selectedItems => {
    // selectedItems is an array of { label, value } objects
    setSelectedItems(selectedItems);
  };

  const emailNotifications = ['Special Offers', 'Newsletter'];

  useEffect(() => {
    // Retrieve the stored user details from AsyncStorage
    AsyncStorage.getItem('setUserDetails').then(value => {
      const userDetails = JSON.parse(value);
      setFirstName(userDetails.firstName);
      setEmail(userDetails.email);
    });
    const base64Image = AsyncStorage.getItem('selectedImage');
    if (base64Image) {
      setImageURI(`data:image/jpeg;base64,${base64Image}`);
    }
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
            marginTop: 20,
            marginLeft: 15,
          }}>
          <Icon
            name="angle-left"
            size={26}
            color="white"
            style={{alignSelf: 'center', paddingTop: 3}}
          />
        </View>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
        <View style={{height: 50, width: 50}}></View>
      </View>
      <View style={{height: height * 0.49}}>
        <Text style={styles.text2}>Personal Information</Text>
        <Text style={styles.text}>Avatar</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          {imageURI ? (
            <Image
              source={{uri: imageURI}}
              style={{width: 60, height: 60, borderRadius: 75}}
            />
          ) : (
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 75,
                backgroundColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.placeholderText}>
                {`${firstName.charAt(0)}`}
              </Text>
            </View>
          )}
          <Pressable style={styles.button2} onPress={handleImagePicker}>
            <Text style={{fontSize: 15, color: '#EDEFEE'}}>Change</Text>
          </Pressable>
          <Pressable style={styles.button3}>
            <Text>Remove</Text>
          </Pressable>
        </View>
        <View></View>
        <KeyboardAvoidingView
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
      <View>
        <Text style={styles.text2}>Email notifications</Text>
        <SelectMultiple
          items={emailNotifications}
          selectedItems={selectedItems}
          onSelectionsChange={onSelectionsChange}
          style={{backgroundColor: '#EDEFEE'}}
          rowStyle={{padding: 5, backgroundColor: '#EDEFEE'}}
          labelStyle={{color: '#495E57', fontWeight: 'normal'}}
          checkboxStyle={{color: 'green'}}
        />
        <View>
          {selectedItems.map((item, index) => (
            <Text key={index}>{item.label}</Text>
          ))}
        </View>
      </View>
      <Pressable style={styles.button}>
        <Text
          style={{fontSize: 23, alignSelf: 'center', fontWeight: '600'}}
          onPress={() => {
            try {
              // Clear all data from the disk
              AsyncStorage.clear();

              // Navigate to the Onboarding screen
              navigation.navigate('Home');
              AsyncStorage.setItem('completedOnboarding', 'true');
            } catch (error) {
              console.error('Error logging out:', error);
            }
          }}>
          Logout
        </Text>
      </Pressable>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Pressable style={[styles.button3, {width: width * 0.32}]}>
          <Text>Discard changes</Text>
        </Pressable>
        <Pressable style={[styles.button2, {width: width * 0.3}]}>
          <Text style={{fontSize: 15, color: '#EDEFEE'}}>Save changes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: height * 0.1,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 5,
    height: height * 0.055,
  },
  button: {
    height: 45,
    width: width * 0.9,
    backgroundColor: '#F4CE14',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 20,
    alignSelf: 'center',
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
