import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get("window");
console.log(SCREEN_WIDTH, SCREEN_HEIGHT);

export default function App() {
  return (
    
    <View style={styles.container}>
      
      <View style={styles.city}>
          <Text style={styles.cityName}>
            Seoul
          </Text>
      </View>
      <ScrollView horizontal contentContainertyle={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.desc}>Sunny</Text>
          </View>
      </ScrollView>
      
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

  },
  day: {
    
    alignItems: 'center',
  },
  temp: {
    fontSize: 175,
    marginTop: 50,
    marginLeft: 20,
  },
  desc: {
    fontSize: 50,
    marginTop: -30,
  }
})