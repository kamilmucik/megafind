import React, {Component} from 'react';
import * as ImagePicker from "react-native-image-picker"
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, PermissionsAndroid } from 'react-native';

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
      this.setState({
        debugInfo: 'Camera permission given'
      });
    } else {
      console.log("Camera permission denied");
      this.setState({
        debugInfo: 'Camera permission denied'
      });
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
      fileUri: ''
    }
  }

  

  launchCamera = () => {
    let options = {
      includeBase64: true,
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.8,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    requestCameraPermission();
    
    ImagePicker.launchCamera(options, async (response) => {
      // console.log('Response = ', response);
      
      // this.setState({
      //   debugInfo: 'response camera' + JSON.stringify(response)
      // });

      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({
          debugInfo: 'User cancelled image picker'
        });
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({
          debugInfo: 'ImagePicker Error: '+ response.error
        });
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        this.setState({
          debugInfo: 'User tapped custom button'
        });
        alert(response.customButton);
      } else {
        // const source = { uri: response.uri };
        console.log('response b', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.assets[0].uri
        });
        // this.setState({resourcePath: response});
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
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        this.setState({
          debugInfo: 'response gallery'
        });
  
        if (response.didCancel) {
          // console.log('User cancelled image picker');
          this.setState({
            debugInfo: 'User cancelled image picker'
          });
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
          this.setState({
            debugInfo: 'ImagePicker Error: '+ response.error
          });
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
          this.setState({
            debugInfo: 'User tapped custom button'
          });
          alert(response.customButton);
        } else {
          // const source = { uri: response.uri };
          // console.log('response b', JSON.stringify(response));
          this.setState({
            filePath: response,
            fileData: response.data,
            fileUri: response.assets[0].uri,
            fileBase64: response.assets[0].base64
          });
          // this.setState({resourcePath: response});
        }
      },
    )
  };


  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={require('../assets/blank.png')}
        style={styles.images}
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
      <View style={styles.container}>
        {/* <View style={styles.ImageSections}>
              <View>
                {this.renderFileData()}
                <Text  style={{textAlign:'center'}}>Base 64 String</Text>
              </View>
              <View>
                {this.renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
            </View> */}
        <View style={styles.container}>

          {/* <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.fileData,
            }}
            style={{ width: 100, height: 100 }}
          /> */}
          <Image
            source={{ uri: this.state.fileUri }}
            style={{ width: 200, height: 200 }}
          />

          <Text style={{ alignItems: 'center' }}>
            {this.state.debugInfo}
          </Text>
          <Text style={{ alignItems: 'center' }}>
            {this.state.fileUri}
          </Text>
          <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
            <Text style={styles.btnText}>Directly Launch Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
              <Text style={styles.buttonText}>Select File</Text>
          </TouchableOpacity>       
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom:12    
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
  }
});

export default AddItem;