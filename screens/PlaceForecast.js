import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { WiDaySunny, WiAlien } from "weather-icons-react";
import { RFValue } from "react-native-responsive-fontsize";
const apiKey = "LRoZJjwVyP5H0eTcGdtyNB2ElFXKeTGE";
const rootURL = "http://dataservice.accuweather.com";
const bgImage = require("../assets/images/background.jpg");

export default class PlaceForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      key: "",
      city: "",
      typedCity: "",
      country: "IN",
      temp: "",
      dailyForecastData: "",
      hourlyForcastData: "",
    };
  }

  getCityWeather = () => {
    var url =
      // "http://dataservice.accuweather.com/currentconditions/v1/7579_PC?apikey=LRoZJjwVyP5H0eTcGdtyNB2ElFXKeTGE";
      rootURL +
      "/locations/v1/cities/search?apikey=" +
      apiKey +
      "&q=" +
      this.state.city;
    console.log(this.state.city);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let json = responseJson[0];
        let key = json.Key;
        let country = json.Country.EnglishName;
        console.log(country);

        let cityJson = {
          key: key,
          city: this.state.city,
          country: country,
        };
        this.props.navigation.navigate("DailyForecast", {
          details: cityJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <View style={styles.toContainer}>
            <TouchableOpacity
              style={styles.toStyles}
              onPress={() => {
                this.props.navigation.navigate("HomeScreen");
              }}
            >
              <Text style={styles.textStyles}>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerContainer}>
            <View style={styles.headingText}>
              <Text style={styles.textStyles}>City Forecast</Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.2,
              flexDirection: "row",
              padding: RFValue(10),
              margin: RFValue(10),
            }}
          >
            <TextInput
              style={styles.inputFont}
              onChangeText={(city) => this.setState({ city: city })}
              placeholder={"Type a City name"}
              placeholderTextColor="white"
              value={this.state.city}
            />
            <TouchableOpacity
              style={styles.toStyles}
              onPress={() => {
                this.getCityWeather();
              }}
            >
              <Text style={styles.textStyles}>Go</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
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
  headerContainer: {
    flex: 0.1,
    flexDirection: "row",
    // borderWidth: 2,
    justifyContent: "center",
    alignContent: "center",
  },
  hourlyContainer: {
    width: RFValue(100),
    flex: 0.3,
    flexDirection: "row",
    // borderWidth: 2,
    margin: RFValue(5),
    padding: RFValue(5),
    justifyContent: "center",
    alignContent: "center",
  },
  display: {
    margin: RFValue(10),
    padding: RFValue(10),
  },
  toContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    // borderWidth: 2,
  },
  headingText: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  bgImage: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
  },

  toStyles: {
    borderRadius: RFValue(10),
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "black",
    height: RFValue(50),
    padding: RFValue(5),
    margin: RFValue(10),
  },
  inputFont: {
    height: RFValue(50),
    // borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    padding: RFValue(10),
    margin: RFValue(10),
    color: "white",
  },
  textStyles: { color: "white", fontSize: RFValue(30) },
});
