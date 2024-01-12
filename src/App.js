import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import ItemDetailScreen from './screens/ItemDetailScreen';

export default function App() {
  const { height } = useWindowDimensions();
  const Stack = createNativeStackNavigator();

  return (
    <View style={[styles.container]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {/**Navigation Stack */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
{/**Container CSS style */ }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff2',
  },
});
