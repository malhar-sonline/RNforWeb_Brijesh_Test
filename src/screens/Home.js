import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ItemContainer from '../components/ItemContainer';
import AddUpdateModal from '../components/AddUpdateModal';
import { BaseSettings } from '../config/BaseSettings';
import { fetchApi } from '../config/apiUtil';


export default function Home({ navigation }) {
  const [showAddModal, setshowAddModal] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [filteredList, setfilteredList] = useState([]);
  const [modalType, setmodalType] = useState('add');
  const [selectedItem, setselectedItem] = useState({});
  const [searchValue, setsearchValue] = useState('');

  useEffect(() => {
    getItem();
  }, []);

  /**
   * Network Call for get all item list
   * invoke funtion when new list get
   * */
  const getItem = () => {
    fetchApi(
      'get',
      BaseSettings.endpoints.getItemList,
      {},
      {
        Authorization: `Bearer a8e0930e`,
      },
    )
      .then(res => {
        /**
        * Handle success response here 
        * set list item in state
        * */
        setItemList(res);
        setfilteredList(res);
      })
      .catch(err => {
        /**
        * Handle failier response here 
        * */
        console.log('🚀 ~ getItem ~ err:', err);
      });
  };

  /**
    * invoce funtion when press delete 
    * @param itemID
    * */
  const deleteItem = id => {
    fetchApi(
      'delete',
      BaseSettings.endpoints.deleteItem(id),
      {},
      {
        Authorization: `Bearer a8e0930e`,
      },
    )
      .then(res => {
        /**
        * Handle success response here 
        * Refesh list after successfully item deleted
        * */
        getItem();
      })
      .catch(err => {
        /**
       * Handle failier response here 
       * */
        console.log('🚀 ~ getItem ~ err:', err);
      });
  };

  useEffect(() => {
    if (searchValue) {
      setfilteredList(
        itemList.filter(item =>
          item?.name.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Text style={styles.screenTitle}>Item Listing</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setshowAddModal(true);
          }}>
          <Text style={styles.buttonText}>Add New Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          placeholder="Search"
          onChangeText={setsearchValue}
          style={styles.input}
        />
      </View>
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          {/**
            * @ListItem 
            *  Render list item
            */}
          return (
            <ItemContainer
              ItemDetails={item}
              onItemClick={() => {
                navigation.navigate('ItemDetailScreen', { itemID: item.id });
              }}
              onDeletePress={() => {
                deleteItem(item?.id);
              }}
              onUpdatePress={() => {
                setmodalType('update');
                setselectedItem(item);
                setshowAddModal(true);
                // setTimeout(() => {
                // }, 1000);
              }}
            />
          );
        }}
      />
      {/**
       * @Modal
       * Open modal when add new item 
       * OPen modal when existing data update
       */}
      <AddUpdateModal
        visible={showAddModal}
        onCloseModal={() => {
          setshowAddModal(false);
          setmodalType('add');
          setselectedItem({});
        }}
        type={modalType}
        onAddSuccess={() => {
          setshowAddModal(false);
          getItem();
        }}
        onUpdateSuccess={() => {
          setshowAddModal(false);
          getItem();
          setmodalType('add');
          setselectedItem({});
        }}
        ItemDetails={selectedItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: Platform.OS === 'web' ? '50%' : '100%',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: 'green',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'web' ? 40 : 30, // Adjust the height based on your preference
    width: Platform.OS === 'web' ? '20%' : '50%', // Adjust the width based on your preference
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',

  },
});
