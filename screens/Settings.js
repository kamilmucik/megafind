import React, { useState, Component } from 'react';
import { StyleSheet,Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class  Settings extends Component {

  constructor(props){
    super(props)

    this.state = {
      sourceUrl: 'http://www.e-strix.pl/api/megapack',
    }
  }

  _handlePress() {
    // console.log(this.state.sourceUrl);
    AsyncStorage.setItem('@storage_Key', this.state.sourceUrl)
  }

  componentDidMount(){
  AsyncStorage.getItem('@storage_Key').then((value) => {
    if (value) {
      this.setState({sourceUrl:value})
    }else{
      this.setState({sourceUrl:'http://www.e-strix.pl/api/megapack'})
    }
  })
  }
  
render(){
  return (
    <View>
      <Text>Settings VIEW 2</Text>
      <Text>sourceUrl: {this.state.sourceUrl}</Text>
      <TextInput 
        style={styles.input} 
        placeholder='Domyślny url serwera'
        value={this.state.sourceUrl}
        onChangeText={(text) => this.setState({sourceUrl:text})}
        />
      <Button 
        onPress={() => this._handlePress()}
        style={styles.buttonStyle} 
        title='Zapisz'
        />
    </View>
  );
}
  
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10
  },
  buttonStyle:{
    color: 'blue'
  }
});

export default Settings;