import React, {Component} from 'react';
import { View,Text, Button } from 'react-native';
import PackageJson from '../package'    // where package is the package.json file


function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Wyszukiwarka produktów</Text>
      <Text>wersja {PackageJson.version} </Text>
      <Button
        title="Dodaj zdjęcia"
        onPress={() => navigation.navigate('AddItem')}
      />
      <Button
        title="Ustawienia"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

export default Feed;