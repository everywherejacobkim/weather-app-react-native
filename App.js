import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get("window");
const API_KEY = "a547490d7e1a6cc61d752508bf272726";

export default function App() {

  const [ok, setOk] = useState(true);
  const [city, setCity] = useState("Loading...");
  const [weatherData, setWeatherData] = useState([]);

  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords:{latitude, longitude},
    } = await Location.getCurrentPositionAsync({accuracy: 5})
    
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude}, 
      {useGoogleMaps:false}
    );
    
    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`)
    const json = await response.json();
    setWeatherData(json.daily);
  }

  useEffect(()=>{
    getWeather();
  }, []);
  

  return (
    
    <View style={styles.container}>
      
      <View style={styles.city}>
          <Text style={styles.cityName}>
            {city}
          </Text>
      </View>

      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.weather}>
        
        {weatherData.length === 0 
        ? (
        <View style={styles.day}>
          <ActivityIndicator size="large" color="#fff" style={{marginTop:10}} />
        </View> 
        )
        : (
          weatherData.map((day, index)=>
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Text style={styles.desc}>{day.weather[0].main}</Text>
              <Text style={styles.descText}>{day.weather[0].description}</Text>
            </View>
          )
        ) 
        
        }
          

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
    flex: 1,
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
    fontSize: 160,
    marginTop: 20,
    fontWeight: 800,
  },
  desc: {
    fontSize: 50,
    marginTop: -30,
  },
  descText: {
    fontSize: 20,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
})