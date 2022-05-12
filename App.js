import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get("window");

export default function App() {

  const [location, setLocation] = useState([]);
  const [ok, setOk] = useState(true);
  const getPermissions = async() => {
    const granted = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
  }

  useEffect(()=>{
    getPermissions();
  }, []);
  

  return (
    
    <View style={styles.container}>
      
      <View style={styles.city}>
          <Text style={styles.cityName}>
            Seoul
          </Text>
      </View>

      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.weather}>
        
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
    width: SCREEN_WIDTH,
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