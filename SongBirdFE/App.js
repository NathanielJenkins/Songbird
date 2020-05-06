import * as React from "react";
import { AsyncStorage, Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "./src/screens/SignInScreen";
import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";

import { AuthContext } from "./src/context/context";

import AuthNavigator from "./src/navigation/AuthNavigator";

const Stack = createStackNavigator();

export default function App() {
	return <AuthNavigator />;
}
