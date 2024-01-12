import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import React from 'react';

export default function ItemContainer(props) {
  const { ItemDetails, onItemClick, onUpdatePress, onDeletePress } = props;
  /**
   * @description name 
   * @description price
   * @description description
   * @description category
   * @function Update
   * @function Delete
   */
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={onItemClick}>
        <Text style={styles.title}>{ItemDetails?.name}</Text>
        <Text style={styles.price}>₹: {ItemDetails?.price}</Text>
        <Text style={styles.description}>{ItemDetails?.description}</Text>
        <Text style={styles.category}>{ItemDetails?.category}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onUpdatePress}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={onDeletePress}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
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
    marginBottom: 16,
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
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: Platform.OS === 'web' ? 'flex-start' : 'space-between',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 4,
    marginEnd: Platform.OS === 'web' ? 20 : 0,
    width: Platform.OS === 'web' ? '24%' : '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
