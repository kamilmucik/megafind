import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from './screens/Settings';
import AddItem from './screens/AddItem';
import Feed from './screens/Feed';
import { Component } from 'react/cjs/react.production.min';

const Stack = createStackNavigator();

export default class App extends Component{
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Feed">
          <Stack.Screen name="Feed" component={Feed} options={{ title: 'Wyszukaj' }}/>
          <Stack.Screen name="AddItem" component={AddItem} options={{ title: 'Dodaj zdjęcia' }}/>
          <Stack.Screen name="Settings" component={Settings} options={{ title: 'Ustawienia' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}