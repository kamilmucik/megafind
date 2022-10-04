import React, {Component, useEffect, useState, useRef} from 'react';
import  QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import * as ImagePicker from "react-native-image-picker"
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Image, SafeAreaView,PermissionsAndroid, TouchableHighlight } from 'react-native';

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



const AddItem = () => {
  const scanner = useRef(null);
  const [debugInfo, setDebugInfo] = useState('');
  const [inputEAN, setInputEAN] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(()=> {
    setResult(null);
  },[])

  const launchCamera = () => {
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
        setFileBase64(response.assets[0].base64);
      }
    });

  }

const launchScannerCamera = () => {
  setScan(true);
}


  const sendToServer = () => {
    fetch('http://e-strix.pl/megafind/api/create.php', {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _ean: inputEAN,
        _image1_base64: fileBase64
      })
  })
  .then((response) => response.json())
      .then((responseJson) => {
        setDebugInfo(responseJson.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderFileData = () => {
    if (fileBase64) {
      return <Image
      source={{
        uri: 'data:image/jpeg;base64,' + fileBase64,
      }}
      style={{ width: 200, height: 200 }}
    /> 
    } else {
      return <Image source={require('../assets/blank.png')}
      style={{ width: 200, height: 200 }}
      />
    }
  }

  const onSuccess = e => {
    alert(e);
    setInputEAN(e.data);
    setScan(false);

  }

    return !scan ? (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
        <TouchableOpacity onPress={launchScannerCamera} style={styles.button}>
            <Text style={styles.buttonText}>Skanuj</Text>
          </TouchableOpacity>

        <TextInput 
          placeholder='EAN'
          style={styles.inputField}
          keyboardType = 'numeric'
          value={inputEAN}
          onChangeText={(text) => setInputEAN(text)}
        />
          
          <Text style={{ alignItems: 'center' }}>
            {debugInfo}
          </Text> 
          <TouchableOpacity onPress={launchCamera}  
            style={styles.chooseImage}>
            {renderFileData()}
            <Text style={styles.btnText}>Zrób zdjęcie</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sendToServer} style={styles.button}  >
              <Text style={styles.buttonText}>Wyślij na serwer</Text>
          </TouchableOpacity>       
        </View>
      </SafeAreaView>
    )  : (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={{ alignItems: 'center' }}>
            scanner kodów
          </Text> 
          <QRCodeScanner
            onRead={onSuccess}
            ref={scanner}
            reactivate={true}
            showMarker={true}
            bottomContent={
              <>
                <TouchableOpacity style={styles.buttonTouchable} onPress={() => scanner.current.reactivate()}>
                  <Text style={styles.buttonText}>OK. Got it!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTouchable} onPress={() => setScan(false)}>
                  <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>
              </>
              
            }
          />
          
          <Text style={{ alignItems: 'center' }}>
            {debugInfo}
          </Text> 
        </View>
      </SafeAreaView>
    ) 
    
  }


const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff'
  },
  chooseImage: {
    
    alignItems: 'center',
  },
  button: {
    margin: 10,
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
    flex: 5,
    fontSize: 17,
    textAlign: 'center',
    borderColor: 'black',
    borderBottomWidth: 1
  },

  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    margin: 10,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});

export default AddItem;