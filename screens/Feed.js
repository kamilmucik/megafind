import React, {useState, useEffect, useRef} from 'react';
import  QRCodeScanner from 'react-native-qrcode-scanner';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  Image
} from 'react-native';
import PackageJson from '../package'    // where package is the package.json file


function Feed({ navigation }) {

  const defaultList = [];

  const scanner = useRef(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState(defaultList);
  const [searchEan, setSearchEan] = useState('');
  const [scan, setScan] = useState(false);

  useEffect(() => getData(), defaultList);

  const getData = () => {
    console.log('getData');
    setLoading(true);
    //Service to get the data from the server to render
    fetch('http://e-strix.pl/megafind/api/index.php?query=' + searchEan)
      //Sending the currect offset with get request
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response
        setDataSource([...responseJson.results]);
        // setDataSource([...dataSource, ...responseJson.results]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View >
        <Text
          style={styles.itemStyle}
          onPress={() => getItem(item)}>
          {item._ean.toUpperCase()}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    // alert('Id : ' + item.id + ' Title : ' + item._ean);
    navigation.navigate('Detail', {
      itemId: item.id,
      _ean: item._ean,
      _image1_base64: item._image1_base64,
    });

  };

  const launchScannerCamera = () => {
    setScan(true);
  }

  const onSuccess = e => {
    setSearchEan(e.data);
    setScan(false);
  }

  return !scan ? (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Text style={styles.versionText}>v: {PackageJson.version} </Text>


          <View style={styles.sectionStyle}>
            <TextInput
              placeholder='EAN'
              keyboardType = 'numeric'
              style={styles.inputField}
              value={searchEan}
              onChangeText={(text) => setSearchEan(text)}
            />
            <TouchableOpacity onPress={launchScannerCamera} style={styles.button2}>
              <Image source={require('../assets/barcode.png')}
                style={{ width: 60, height: 38 }}
              />
            </TouchableOpacity>
          </View>


      <View >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Wyszukaj</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
        <FlatList
          data={dataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          enableEmptySections={true}
          renderItem={ItemView}
          // ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  ): (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <QRCodeScanner
          onRead={onSuccess}
          ref={scanner}
          reactivate={true}
          showMarker={true}
          bottomContent={
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={styles.sectionStyle} onPress={() => scanner.current.reactivate()}>
                <Text style={styles.buttonText2}>OK. Got it!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sectionStyle} onPress={() => setScan(false)}>
                <Text style={styles.buttonText2}>Stop</Text>
              </TouchableOpacity>
              </View>
          }
        />
      </View>
    </SafeAreaView>
  ) ;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  inputField: {
    color: 'black',
    flex: 5,
    fontSize: 14,
    textAlign: 'center',
    borderColor: 'black'
  },
  itemStyle: {
    color: 'black',
    fontSize: 17,
    padding: 10,
  },
  versionText: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'right',
  },

  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
});


export default Feed;