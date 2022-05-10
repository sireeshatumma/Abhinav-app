import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import DailyForecast from "./screens/DailyForecast";
import PlaceForecast from "./screens/PlaceForecast";
import Trail from "./screens/Trail";
import Clock from "./screens/Clock";
import Hs1 from "./screens/Hs1";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DailyForecast" component={DailyForecast} />
        <Stack.Screen name="PlaceForecast" component={PlaceForecast} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Hs1 />
  );
}

export default App;
