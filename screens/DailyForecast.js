import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { WiDaySunny, WiAlien } from "weather-icons-react";
import { RFValue } from "react-native-responsive-fontsize";
const apiKey = "LRoZJjwVyP5H0eTcGdtyNB2ElFXKeTGE";
const rootURL = "http://dataservice.accuweather.com";
const axios = require("axios");
const bgImage = require("../assets/images/background.jpg");
// import HourlyAndDailyForecast from "./HourlyAndDailyForecast";

export default class DailyForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      key: this.props.navigation.getParam("details")["key"],
      // city: "surat",
      city: this.props.navigation.getParam("details")["city"],
      // country: "IN",
      country: this.props.navigation.getParam("details")["country"],
      // temp: this.props.navigation.getParam("details")["temp"],
      dailyForecastData: "",
      hourlyForcastData: "",
    };
  }
  getWeather = () => {
    var url =
      rootURL +
      "/locations/v1/cities/search?apikey=" +
      apiKey +
      "&q=" +
      this.state.city;
    console.log("in daily: " + this.state.city, this.state.key);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        // const key = this.getKey(responseJson);
        let key = "";
        if (this.state.key === undefined) {
          responseJson.map((item) => {
            // console.log("item " + item);
            if (item.Country.ID == this.state.country) {
              key = item.Key;
            }
          });
        } else {
          key = this.state.key;
        }

        console.log("key:" + key);
        this.getDailyForcast(key);
        this.getHourlyForcast(key);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getDailyForcast = (key) => {
    var url = rootURL + "/forecasts/v1/daily/5day/" + key + "?apikey=" + apiKey;
    console.log("url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.getFiveDayTempJson(responseJson.DailyForecasts);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getHourlyForcast = (key) => {
    var url =
      rootURL + "/forecasts/v1/hourly/12hour/" + key + "?apikey=" + apiKey;
    console.log("url: " + url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        // this.getFiveDayTempJson(responseJson.DailyForecasts);
        // console.log("hourly" + responseJson[0].DateTime);
        this.processHourlyJson(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  processHourlyJson = (json) => {
    let hArray = [];
    let i = 0;
    json.map((item) => {
      if (i < 6) {
        let hJson = {
          time: item.DateTime.slice(11, 16),
          temp: this.convertToCel(item.Temperature.Value),
        };
        hArray.push(hJson);
        i++;
        console.log(i);
      }
    });
    console.log(hArray);
    this.setState({ hourlyForcastData: hArray });
  };
  getFiveDayTempJson = (DailyForecasts) => {
    console.log(DailyForecasts);
    let wArray = [];
    DailyForecasts.map((item) => {
      let d = new Date(item.Date).getDay();
      let day = "Sunday";
      switch (d) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        default:
          break;
      }
      let j = {
        Date: item.Date,
        day: day,
        temp:
          this.convertToCel(item.Temperature.Minimum.Value) +
          "/" +
          this.convertToCel(item.Temperature.Maximum.Value),
      };
      wArray.push(j);
    });
    console.log(wArray);
    this.setState({ dailyForecastData: wArray });
  };
  convertToCel = (Ftemp) => {
    return Math.round(((Ftemp - 32) * 5) / 9);
  };
  componentDidMount() {
    this.getWeather();
  }
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
              <Text style={styles.textStyles}>Daily Forecast</Text>
            </View>
          </View>
          <View style={styles.headingText}>
            <Text style={styles.textStyles}>{this.state.city}</Text>
            {/* <Text style={styles.textStyles}>{this.state.temp}</Text> */}
          </View>
          <View style={styles.hourlyContainer}>
            {this.state.hourlyForcastData !== "" ? (
              this.state.hourlyForcastData.map((item, index) => (
                <View key={index} style={styles.display}>
                  <Text style={styles.textStyles}>{item.time}</Text>
                  <Text style={styles.textStyles}>{item.temp}&deg;C</Text>
                </View>
              ))
            ) : (
              <Text style={styles.textStyles}>Loading..</Text>
            )}
          </View>
          <View style={styles.hourlyContainer}>
            {this.state.dailyForecastData !== "" ? (
              this.state.dailyForecastData.map((item, index) => (
                <View key={index} style={styles.display}>
                  <Text style={styles.textStyles}>{item.day}</Text>
                  <Text style={styles.textStyles}>{item.temp}&deg;C</Text>
                </View>
              ))
            ) : (
              <Text style={styles.textStyles}>Loading..</Text>
            )}
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
    width: "80%",
    flex: 0.3,
    flexDirection: "row",
    // borderWidth: 2,
    marginTop: RFValue(10),
    marginLeft: RFValue(5),
    padding: RFValue(3),
    justifyContent: "center",
    alignContent: "center",
  },
  display: {
    marginLeft: RFValue(1),
    padding: RFValue(5),
  },
  toContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "black",
    borderWidth: 2,
    borderRadius: 20,
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
    borderRadius: RFValue(30),
    alignContent: "center",
  },
  textStyles: { color: "white", fontSize: RFValue(20) },
});
