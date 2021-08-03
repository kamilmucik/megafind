import React, {Component} from 'react';
import { Text, View, Image } from 'react-native';

function Detail({ route, navigation  }) {
  const { itemId, _ean, _image1_base64 } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>_ean: {JSON.stringify(_ean)}</Text>      
      <Image
            source={{
              uri: 'data:image/jpeg;base64,' + JSON.stringify(_image1_base64),
            }}
            style={{ width: 200, height: 200 }}
          />
    </View>
    );
}

export default Detail;