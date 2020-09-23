import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VenueExportScreen from "./VenueExporeScreen";
import ChatScreen from "./ChatScreen";

const Tab = createBottomTabNavigator();

export default function VenueHomeScreen() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Explore" component={VenueExportScreen} />
			<Tab.Screen name="Chat" component={ChatScreen} />
		</Tab.Navigator>
	);
}
