import * as React from 'react';
import { Text,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { CustomBackButton } from './components/CustomBackButton';

import Settings from './screens/Settings';
import AddItem from './screens/AddItem';
import Feed from './screens/Feed';
import Detail from './screens/Detail';
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
                              <Text style={{color: 'black', marginLeft: 10}}>Dodaj</Text>
                            </TouchableOpacity>
                          ),
                          headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate("Settings")} > 
                              <Text style={{color: 'black', marginRight: 10}}>Ustawienia</Text>
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
        <Stack.Screen name="Detail" 
                      component={Detail} 
                      options={{ 
                        title: 'Szczegóły',
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