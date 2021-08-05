import React, {Component} from 'react';
import * as ImagePicker from "react-native-image-picker"
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Image, SafeAreaView,PermissionsAndroid } from 'react-native';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message:"App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission given");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: 'www'
      },
      debugInfo: '',
      fileData: '',
      fileBase64: '',
      fileUri: '',
      inputEAN: '',
      loading: true
    }
  }

  launchCamera = () => {
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    requestCameraPermission();
    
    ImagePicker.launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.assets[0].uri,
          fileBase64: response.assets[0].base64
        });
      }
    });

  }

  selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          this.setState({
            filePath: response,
            fileData: response.data,
            fileUri: response.assets[0].uri,
            fileBase64: response.assets[0].base64
          });
        }
      },
    )
  };

  sendToServer = () => {
    // console.log('sendToServer: ' + this.state.fileBase64);
    this.setState({
      debugInfo: 'sendToServer' + this.state.inputEAN,
      loading: true
    });
    fetch('http://192.168.49.103/api/create.php', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _ean: this.state.inputEAN,
        _image1_base64: this.state.fileBase64
      })
  })
  .then((response) => response.json())
      .then((responseJson) => {
        //Successful response
        //Increasing the offset for the next API call
        this.setState({
          debugInfo:  responseJson.message ,
          loading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderFileData() {
    if (this.state.fileBase64) {
      return <Image
      source={{
        uri: 'data:image/jpeg;base64,' + this.state.fileBase64,
      }}
      style={{ width: 200, height: 200 }}
    /> 
    } else {
      return <Image source={require('../assets/blank.png')}
      style={{ width: 200, height: 200 }}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('../assets/blank.png')}
        style={styles.images}
      />
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <TextInput 
          placeholder='EAN'
          style={styles.inputField}
          keyboardType = 'numeric'
          value={this.state.inputEAN}
          onChangeText={(text) => this.setState({inputEAN:text})}
        />
          
          <Text style={{ alignItems: 'center' }}>
            {this.state.debugInfo}
          </Text>
          <TouchableOpacity onPress={this.launchCamera}  
          
            style={styles.chooseImage}>
            {this.renderFileData()}
            <Text style={styles.btnText}>Zrób zdjęcie</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
              <Text style={styles.buttonText}>Select File</Text>
          </TouchableOpacity>   */}

          <TouchableOpacity onPress={this.sendToServer} style={styles.button}  >
              <Text style={styles.buttonText}>Wyślij na serwer</Text>
          </TouchableOpacity>       
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff'
  },
  chooseImage: {
    alignItems: 'center',
  },
  button: {
    // width: 250,
    // height: 60,
    // backgroundColor: '#3740ff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 4,
    // marginBottom:4  
    margin: 20,
    padding: 14,
    backgroundColor: '#3740ff',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff'
  },
  
  inputField: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    borderColor: 'black',
    borderBottomWidth: 1
  },
});

export default AddItem;