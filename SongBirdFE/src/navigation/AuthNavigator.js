import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { AsyncStorage } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, ProfileContext } from "../context/context";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import PerformerHomeScreen from "../screens/PerformerHomeScreen";
import VenueHomeScreen from "../screens/VenueHomeScreen";
import ChooseUserType from "../screens/ChooseUserType";
import WelcomeScreen from "../screens/WelcomeScreen";
import InformationScreen from "../screens/InformationScreen";
import EditProfile from "../screens/EditProfile";

//axios
import {
	register,
	test,
	login,
	updateUser,
	getProfile,
} from "../api/apiHandler";

import { SimpleAlert } from "../components/Form";

const Stack = createStackNavigator();

export default function AuthNavigator({ navigation }) {
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "RESTORE_TOKEN":
					return {
						...prevState,
						userToken: action.token,
						userType: action.userType,
						isLoading: false,
					};
				case "SIGN_IN":
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
						userType: action.userType,
					};
				case "SIGN_OUT":
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
				case "ACCOUNT_CHANGE":
					return {
						...prevState,
						userType: action.userType,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
			userType: -1,
		}
	);

	useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken;
			let userType;
			let items;
			let newUser;

			try {
				userToken = await AsyncStorage.getItem("userToken");
				userType = parseInt(await AsyncStorage.getItem("userType"));
				newUser = parseInt(await AsyncStorage.getItem("newUser"));
				//console.log(items[0][0], items[0][1]);
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			dispatch({
				type: "RESTORE_TOKEN",
				token: userToken,
				userType: userType,
			});
		};

		bootstrapAsync();
	}, []);

	//profile context
	const [profile, setProfile] = useState({
		group_name: "",
		description: "",
		header_screen: "/",
	});
	useEffect(() => {
		getProfile().then((res) => {
			if (res.success) setProfile(res.profile);
		});
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async (data) => {
				return login(data).then((resp) => {
					if (resp.success) {
						dispatch({
							type: "SIGN_IN",
							token: resp.token,
							userType: resp.user.type,
						});
						AsyncStorage.setItem("userToken", resp.token);
						AsyncStorage.setItem("userType", resp.user.type.toString());
					}
					return resp;
				});
			},

			signOut: () => dispatch({ type: "SIGN_OUT" }),
			signUp: (data) => register(data),
			setAccountVenue: (data) => {
				return updateUser(data).then((resp) => {
					dispatch({ type: "ACCOUNT_CHANGE", userType: data.type });
					AsyncStorage.setItem("userType", data.type.toString());
				});
			},
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			<ProfileContext.Provider value={[profile, setProfile]}>
				<NavigationContainer>
					<Stack.Navigator>
						{state.isLoading ? (
							// We haven't finished checking for the token yet
							<Stack.Screen name="Splash" component={SplashScreen} />
						) : state.userToken == null ? (
							// No token found, user isn't signed in
							<>
								<Stack.Screen
									name="Welcome"
									component={WelcomeScreen}
									options={{
										headerShown: false,
										title: "Welcome",
									}}
								/>
								<Stack.Screen
									name="Information"
									component={InformationScreen}
									options={{
										headerShown: false,
										title: "Welcome",
									}}
								/>
								<Stack.Screen
									name="SignUp"
									component={SignUpScreen}
									options={{
										title: "Sign up",

										// When logging out, a pop animation feels intuitive
										animationTypeForReplace: state.isSignout ? "pop" : "push",
									}}
								/>
								<Stack.Screen
									name="SignIn"
									component={SignInScreen}
									options={{
										title: "Sign in",
										// When logging out, a pop animation feels intuitive
										animationTypeForReplace: state.isSignout ? "pop" : "push",
									}}
								/>
							</>
						) : state.userType == 0 ? (
							<>
								<Stack.Screen
									name="PerformerHome"
									component={PerformerHomeScreen}
									options={{
										headerShown: false,
										title: "Performer Home",
									}}
								/>
								<Stack.Screen
									name="EditProfile"
									component={EditProfile}
									options={{
										title: "Edit Profile",
									}}
								/>
							</>
						) : state.userType == 1 ? (
							<>
								<Stack.Screen
									name="VenueHome"
									component={VenueHomeScreen}
									options={{
										headerShown: false,
										title: "Venue Home",
									}}
								/>
							</>
						) : (
							<>
								<Stack.Screen
									options={{ headerShown: false }}
									name="ChooseUserType"
									component={ChooseUserType}
								/>
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			</ProfileContext.Provider>
		</AuthContext.Provider>
	);
}
