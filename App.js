import * as React from 'react';
import { Button, View, Text,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CustomBackButton } from './components/CustomBackButton';

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
          <Stack.Screen name="Feed" 
                        component={Feed} 
                        options={({ navigation }) => ({
                          title: 'Wyszukaj' ,
                          headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.navigate("AddItem")} > 
                              <Text style={{color: 'black'}}>Dodaj</Text>
                            </TouchableOpacity>
                          ),
                          headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")} > 
                              <Text style={{color: 'black'}}>Ustawienia</Text>
                            </TouchableOpacity>
                          ),
                        })}
                        />
          <Stack.Screen name="AddItem" 
                        component={AddItem} 
                        options={{ 
                          title: 'Dodaj zdjęcia',
                          headerBackImage: ()=>(<Text>Wróć</Text>),
                        }}/>
          <Stack.Screen name="Settings" 
                        component={Settings} 
                        options={{ 
                          title: 'Ustawienia',
                          headerBackImage: ()=>(<Text>Wróć</Text>),
                          }}
                          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}