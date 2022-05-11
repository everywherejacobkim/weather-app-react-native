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
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1, 
    backgroundColor: 'skyblue'
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  cityName: {
    color: 'black',
    fontWeight: '600',
    fontSize: 68,
  },
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
    alignItems: 'center',
  },
  temp: {
    fontSize: 175,
    marginTop: 50,
  },
  desc: {
    fontSize: 50,
    marginTop: -30,
  }
})