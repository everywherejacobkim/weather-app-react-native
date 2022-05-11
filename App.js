import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    
    <View style={styles.container}>
      
      <View style={styles.city}>
          <Text style={styles.cityName}>
            Seoul
          </Text>
      </View>
      <View style={styles.weather}>
          <Text>
            Weather
          </Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1, 
    backgroundColor: 'black'
  },
  city: {
    flex: 1,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  cityName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 68,
  },
  weather: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  }
})