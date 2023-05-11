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
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaskedTextInput} from 'react-native-mask-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectMultiple from 'react-native-select-multiple';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('window');

const desc = `We are a family owned
Mediterranean restaurant,
focused on traditional 
recipes.`;
function Home({navigation}) {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json',
    )
      .then(response => response.json())
      .then(data => setMenuData(data.menu))
      .catch(error => console.error(error));
  }, []);

  const renderMenuItem = ({item}) => {
    const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`;

    return (
      <View>
        <Image source={{uri: imageUrl}} style={{width: 100, height: 100}} />
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>{`$${item.price}`}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
        <View style={{height: 50, width: 50}}></View>
      </View>
      <View
        style={{
          height: height * 0.35,
          backgroundColor: '#495E57',
          marginTop: 10,
        }}>
        <Text style={styles.text2}>Little Lemon</Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.text}>Avatar</Text>
            <Text style={styles.text3}>{desc}</Text>
          </View>
          <View
            style={{
              height: width * 0.3,
              width: width * 0.3,
              borderRadius: 16,
              backgroundColor: 'white',
              marginLeft: width * 0.17,
            }}>
            <Image
              style={{
                height: width * 0.3,
                width: width * 0.3,
                borderRadius: 16,
              }}
              source={require('../assets/HeroImage.png')}
            />
          </View>
        </View>
        <View
          style={{
            height: 35,
            width: 35,
            backgroundColor: 'white',
            borderRadius: 50,
            marginTop: 20,
            marginLeft: 15,
          }}>
          <Icon
            name="search"
            size={22}
            color="#495E57"
            style={{alignSelf: 'center', paddingTop: 6}}
          />
        </View>
      </View>

      <Text>ORDER FOR DELIVERY!</Text>

      <FlatList
        data={menuData}
        renderItem={renderMenuItem}
        keyExtractor={item => item.name}
      />

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
    justifyContent: 'center',
  },
  logo: {
    height: height * 0.07,
    width: width * 0.5,
    alignSelf: 'center',
    marginTop: 12,
  },
  text: {
    fontSize: 23,
    alignSelf: 'flex-start',
    marginLeft: 15,
    color: 'white',
  },

  text3: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: 15,
    color: 'white',
    marginTop: 5,
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
    fontSize: 29,
    marginHorizontal: 15,
    marginTop: 8,
    color: '#F4CE14',
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

export default Home;
