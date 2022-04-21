import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Signup from "../screens/Signup";

import colors from "../constants/colors";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{ title: "Signup" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
