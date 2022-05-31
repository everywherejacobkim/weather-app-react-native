import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get("window");
const API_KEY = "a547490d7e1a6cc61d752508bf272726";

const icons = {
  Clouds: "weather-cloudy",
  Rain: "weather-pouring",
  Clear: "weather-sunny",
  Snow : "weather-snowy-heavy",
  Thunderstorm: "weather-lightning"
}

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
              <View style={styles.weatherIcon}>
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(0)}</Text>
                <MaterialCommunityIcons name={icons[day.weather[0].main]} size={60} color="white" />
              </View>

              <Text style={styles.desc}>{day.weather[0].main}</Text>
              <Text style={styles.descText}>{day.weather[0].description}</Text>
            </View>
          )
        ) 
        
        }
      </ScrollView>


      <View style={styles.copyRightContainer}>
          <Text style={styles.copyRightText}>
            Made by 
          </Text>
          <Text style={styles.copyRightText}>
            Jacob Kim 2022
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1, 
    backgroundColor: 'slateblue',
  },
  city: {
    flex: 1.8,
    justifyContent: 'center',
    alignItems: 'left',
    paddingLeft: 30,
  }, 
  cityName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 68,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'left',
    paddingLeft: 30,
  },
  temp: {
    fontSize: 140,
    marginTop: 30,
    color: '#fff',
  },
  desc: {
    fontSize: 30,
    marginLeft: 15,
    color: '#fff',
  },
  descText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 15,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  weatherIcon : {
    flexDirection:"row", 
    alignItems: "center", 
    justifyContent: "space-between",
    width: '80%',
  },
  copyRightContainer: {
    flex: 1,
    paddingLeft: 30,
  },
  copyRightText: {
    fontSize: 16,
    color: '#fff',
  }
})