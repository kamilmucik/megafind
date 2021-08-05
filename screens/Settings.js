import React, { useState, Component } from 'react';
import { StyleSheet,Text, View, TextInput, Button,TouchableOpacity,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class  Settings extends Component {

  constructor(props){
    super(props)

    this.state = {
      sourceUrl: 'http://www.e-strix.pl/api/megapack',
      loading: false
    }
  }

  _handlePress() {
    // setLoading(true);
    this.setState({
      loading: true
    });

    // console.log(this.state.sourceUrl);
    AsyncStorage.setItem('@storage_Key', this.state.sourceUrl)

    this.setState({
      loading: false
    });
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
      <TextInput 
        style={styles.input} 
        placeholder='Domyślny url serwera'
        value={this.state.sourceUrl}
        onChangeText={(text) => this.setState({sourceUrl:text})}
        />
      {/* <Button 
        onPress={() => this._handlePress()}
        style={styles.buttonStyle} 
        title='Zapisz'
        /> */}
      <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => this._handlePress()}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Zapisz</Text>
          {this.state.loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
    </View>
  );
}
  
};

const styles = StyleSheet.create({
  input: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    borderColor: 'black',
    borderBottomWidth: 1
  },
  buttonStyle:{
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
  
  loadMoreBtn: {
    margin: 20,
    padding: 14,
    backgroundColor: '#3740ff',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default Settings;