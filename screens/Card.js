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

const {width, height} = Dimensions.get('window');

const Card = ({text, description, image, price}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'black',
          width: width * 0.9,
          height: StyleSheet.hairlineWidth * 2,
          alignSelf: 'center',
          marginTop: 5,
          marginBottom: 10,
        }}></View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
              }}>
              {text}
            </Text>
            <Text
              style={{
                fontSize: 14,
                maxWidth: width * 0.7,
              }}>
              {description}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 5,
              }}>
              {`$${price}`}
            </Text>
          </View>
          <Image
            source={{uri: image}}
            style={{width: 70, height: 70, marginVertical: 20, marginRight: 20}}
          />
        </View>
      </View>
    </View>
  );
};

export default Card;
{
  /* <Image source={{uri: imageUrl}} style={{width: 30, height: 30}} />
<Text>{item.name}</Text>
<Text>{item.description}</Text>
<Text>{`$${item.price}`}</Text> */
}
