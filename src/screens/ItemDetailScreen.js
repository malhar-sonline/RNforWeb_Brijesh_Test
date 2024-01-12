// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { axiosApi, fetchApi } from '../config/apiUtil';
import { BaseSettings } from '../config/BaseSettings';

// Detail screen component
const ItemDetailScreen = ({ route }) => {
  const { itemID } = route.params;
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    getItemDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
  * Network Call for getting seleted item detail
  * @param itemID
  * */
  const getItemDetails = () => {
    fetchApi(
      'get',
      BaseSettings.endpoints.getItemDetails(itemID),
      {},
      {
        Authorization: `Bearer a8e0930e`,
      },
    )
      .then(res => {
        /**
        * Handle success response here 
        * */
        setItemDetails(res);
      })
      .catch(err => {
        /**
        * Handle failier response here 
        * */
        console.log('🚀 ~ getItemDetails ~ err:', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{itemDetails?.name}</Text>
      <Text style={styles.price}>Price: {itemDetails?.price}</Text>
      <Text style={styles.description}>{itemDetails?.description}</Text>
      <Text style={styles.category}>Category: {itemDetails?.category}</Text>
      <Text style={styles.inStock}>
        {itemDetails?.inStock ? 'In Stock' : 'Out of Stock'}
      </Text>
      <Text style={styles.rating}>Rating: {itemDetails?.rating}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  inStock: {
    fontSize: 16,
    color: '#2ecc71', // Green color for in-stock
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#f39c12', // Orange color for rating
    marginBottom: 8,
  },
});

export default ItemDetailScreen;
