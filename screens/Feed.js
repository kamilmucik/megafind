import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button
} from 'react-native';
import PackageJson from '../package'    // where package is the package.json file


function Feed({ navigation }) {

  const defaultList = [];

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState(defaultList);
  const [searchEan, setSearchEan] = useState('');

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


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Text style={styles.versionText}>v: {PackageJson.version} </Text>
      <TextInput 
        placeholder='EAN'
        keyboardType = 'numeric'
        style={styles.inputField}
        value={searchEan}
        onChangeText={(text) => setSearchEan(text)}
        />
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
  );
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
    fontSize: 17,
    textAlign: 'center',
    borderColor: 'black',
    borderBottomWidth: 1
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
});


export default Feed;