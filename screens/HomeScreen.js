import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import Clock from "./Clock";

import { RFValue } from "react-native-responsive-fontsize";
const bgImage = require("../assets/images/background.jpg");
// import Geolocation from "@react-native-community/geolocation";
import Geolocation from "react-native-geolocation-service";
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      time: "",
      // img: require("../assets/images/moon at 8.jpg"),
      img: "img1",
      accuWeather: [],
      lat: "",
      long: "",
      place: "",
      weatherJson: {},
    };
  }

  getWeather = async () => {
    //change latitude and longitude
    const { lat, long } = this.state;
    var url =
      // "https://fcc-weather-api.glitch.me/api/current?lat=21.17&lon=72.83";
      "https://fcc-weather-api.glitch.me/api/current?lat=" +
      lat +
      "&lon=" +
      long;
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson: " + responseJson.sys.sunrise);
        var date = new Date(responseJson.dt);
        console.log(date.getHours() + ":" + date.getMinutes());

        let sunrise = new Date(responseJson.sys.sunrise).toLocaleTimeString(
          "en-US"
        );
        let sunset = new Date(responseJson.sys.sunset).toLocaleTimeString(
          "en-US"
        );
        let json = {
          city: responseJson.name,
          country: responseJson.sys.country,
          temp: responseJson.main.temp_min + "/" + responseJson.main.temp_max,
          humidity: responseJson.main.humidity,
          description: responseJson.weather[0].description,
          sunrise: sunrise,
          sunset: sunset,
          feels_like: responseJson.main.feels_like,
          wind_speed: responseJson.wind.speed,
        };
        this.setState({
          weather: responseJson,
          weatherJson: json,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getLocation = () => {
    if (navigator.geolocation) {
      // console.log("this: " + navigator.geolocation.getCurrentPosition());
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  showPosition = (position) => {
    this.setState({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    // this.getWeather();
  };
  getOneTimeLocation = () => {
    this.setState({ locationStatus: "Getting Location ..." });
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({ long: currentLongitude });
        //Setting Longitude state
        this.setState({ lat: currentLatitude });
      },
      (error) => {
        this.setState({ locationStatus: error.message });
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  subscribeLocationLocation = () => {
    const watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        this.setState({ locationStatus: "You are Here" });

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        this.setState({ long: currentLongitude });

        //Setting Latitude state
        this.setState({ lat: currentLatitude });
      },
      (error) => {
        this.setState({ locationStatus: error.message });
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      }
    );
  };
  requestLocationPermission = async () => {
    if (Platform.OS === "ios" || Platform.OS === "web") {
      // this.getOneTimeLocation();
      this.getLocation();
      // this.subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // this.getOneTimeLocation();
          this.getLocation();
          // this.subscribeLocationLocation();
          console.log("granted");
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  componentDidMount() {
    this.requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
    this.getWeather();
  }

  render() {
    const { weather } = this.state;
    console.log("weather: " + weather);
    if (weather === "") {
      return (
        <View style={styles.container}>
          <ImageBackground source={bgImage} style={styles.bgImage}>
            <View style={{ flex: 0.5, margin: 50, justifyContent: "center" }}>
              <Text style={{ color: "white", fontSize: RFValue(30) }}>
                Loading...
              </Text>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground source={bgImage} style={styles.bgImage}>
            <View style={{ flex: 0.5, margin: RFValue(1) }}>
              <Text style={{ color: "white", fontSize: RFValue(30) }}>
                {weather.name}
              </Text>
              <View style={{ flex: 0.5, margin: RFValue(1) }}>
                <Text style={styles.textStyles}>
                  {weather.main.temp_min + "/" + weather.main.temp_max}
                  &deg;C
                </Text>
                {/* <Text style={styles.textStyles}>
                  feels like : {weather.main.feels_like}
                  &deg;C
                </Text> */}

                <Text style={styles.textStyles}>
                  humidity : {weather.main.humidity}
                </Text>
                <Text style={styles.textStyles}>
                  {weather.weather[0].description}
                </Text>
                <Text style={styles.textStyles}>
                  wind speed : {this.state.weatherJson.wind_speed}
                </Text>
              </View>
            </View>
            <View style={{ flex: 0.3 }}>
              <Clock />
              <View
                style={{ flex: 0.5, flexDirection: "row", padding: RFValue(5) }}
              >
                <TouchableOpacity
                  style={styles.toStyles}
                  onPress={() => {
                    // console.log("weatherJson " + this.state.weatherJson.name);
                    this.props.navigation.navigate("DailyForecast", {
                      details: this.state.weatherJson,
                    });
                  }}
                >
                  <Text style={{ color: "white", fontSize: RFValue(20) }}>
                    Daily Forecast
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toStyles}
                  onPress={() => {
                    this.props.navigation.navigate("PlaceForecast", {
                      details: this.state.weatherJson,
                    });
                  }}
                >
                  <Text style={{ color: "white", fontSize: RFValue(20) }}>
                    Place Forecast
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  subContainer: {
    flex: 1,
    // borderWidth: 1,
    alignItems: "center",
  },
  title: {
    marginTop: RFValue(10),
    fontSize: RFValue(20),
    color: "#ffffff",
  },
  cloudImage: {
    width: RFValue(60),
    height: RFValue(60),
    marginTop: RFValue(20),
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    // marginTop: -150,
  },
  toStyles: {
    width: RFValue(150),
    height: RFValue(50),
    borderRadius: RFValue(20),
    backgroundColor: "black",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  textStyles: {
    fontSize: RFValue(20),
    marginTop: RFValue(2),
    color: "#ffffff",
  },
});
