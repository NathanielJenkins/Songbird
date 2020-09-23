import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PreformerProfileScreen from "./PreformerProfileScreen";
import ChatScreen from "./ChatScreen";

const Tab = createBottomTabNavigator();

export default function PerformerHomeScreen() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Profile" component={PreformerProfileScreen} />
			<Tab.Screen name="Chat" component={ChatScreen} />
		</Tab.Navigator>
	);
}
