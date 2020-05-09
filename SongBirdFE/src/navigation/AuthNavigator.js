import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/context";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function AuthNavigator({ navigation }) {
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "RESTORE_TOKEN":
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case "SIGN_IN":
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case "SIGN_OUT":
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	);

	React.useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken;

			try {
				userToken = await AsyncStorage.getItem("userToken");
			} catch (e) {
				// Restoring token failed
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			dispatch({ type: "RESTORE_TOKEN", token: userToken });
		};

		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async (data) => {
				dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
			},
			signOut: () => dispatch({ type: "SIGN_OUT" }),
			signUp: async (data) => {
				console.log(data);

				dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
			},
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				<Stack.Navigator>
					{state.isLoading ? (
						// We haven't finished checking for the token yet
						<Stack.Screen name="Splash" component={SplashScreen} />
					) : state.userToken == null ? (
						// No token found, user isn't signed in
						<>
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
					) : (
						// User is signed in
						<>
							<Stack.Screen name="Home" component={HomeScreen} />
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}
