import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  SafeAreaView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { axiosApi, fetchApi } from '../config/apiUtil';
import { BaseSettings } from '../config/BaseSettings';

export default function AddUpdateModal(props) {
  const {
    visible,
    onCloseModal,
    type,
    ItemDetails,
    onUpdateSuccess,
    onAddSuccess,
  } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(false);
  const [rating, setRating] = useState('');

  useEffect(() => {
    let isUpdate = type !== 'add';
    if (isUpdate) {
      setName(ItemDetails.name);
      setDescription(ItemDetails.description);
      setPrice(ItemDetails.price.toString());
      setCategory(ItemDetails.category);
      setInStock(ItemDetails.inStock);
      setRating(ItemDetails.rating.toString());
    }
  }, [ItemDetails, type]);

  const handleSubmit = () => {
    // Validate the form data before submitting
    if (!name || !description || !price || !category || rating === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Convert rating to a number
    const ratingNumber = parseInt(rating);

    // Validate the rating
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      alert('Rating must be a number between 1 and 5.');
      return;
    }

    // Create an item object with the form data
    const newItem = {
      name,
      description,
      price,
      category,
      inStock,
      rating: ratingNumber,
    };

    // Pass the new item to the onSubmit callback
    if (type === 'add') {
      addItem(newItem);
    } else {
      updateItem(newItem);
    }

    // Reset the form fields
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setInStock(false);
    setRating('');
  };

  /**
   * invoke when add new item or update item
   * @param name
   * @param description
   * @param price
   * @param category
   * @param inStock
   * @param rating
   */
  const updateItem = newItem => {
    fetchApi(
      'put',
      BaseSettings.endpoints.updateItem(ItemDetails.id),
      newItem,
      {
        Authorization: `Bearer a8e0930e`,
      },
    )
      .then(() => {
        onUpdateSuccess();
      })
      .catch(err => {
        console.log('🚀 ~ addItem ~ err:', err);
      });
  };

  const addItem = newItem => {
    fetchApi('post', BaseSettings.endpoints.createItem, newItem, {
      Authorization: `Bearer a8e0930e`,
    })
      .then(() => {
        onAddSuccess();
      })
      .catch(err => {
        console.log('🚀 ~ addItem ~ err:', err);
      });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, Platform.OS === 'web' && styles.webContainer]}>
          <View style={styles.viewContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter name"
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={text => setDescription(text)}
              placeholder="Enter description"
            />

            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
              placeholder="Enter price"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Category:</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={text => setCategory(text)}
              placeholder="Enter category"
            />

            <View style={styles.switchContainer}>
              <Text style={styles.label}>In Stock:</Text>
              <Switch value={inStock} onValueChange={value => setInStock(value)} />
            </View>

            <Text style={styles.label}>Rating:</Text>
            <TextInput
              style={styles.input}
              value={rating}
              onChangeText={text => setRating(text)}
              placeholder="Enter rating (1-5)"
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                {type === 'add' ? 'Add Item' : 'Update Item'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onCloseModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </Modal>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  viewContainer: {
    minWidth: Platform.OS === 'web' ? '40%' : '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: "left"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    // width: Platform.OS === 'web' ? '50%' : '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 4,
    marginVertical: 8,
    // width: Platform.OS === 'web' ? '50%' : '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  webContainer: {
    alignItems: 'center'
  }
});
