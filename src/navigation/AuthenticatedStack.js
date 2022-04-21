import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { removeToken } from "../store/slices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "../screens/Home";
import IconButton from "../components/IconButton";

import colors from "../constants/colors";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(removeToken());

    AsyncStorage.removeItem("token");
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        headerTintColor: "#fff",
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              onPress={logoutHandler}
              name="exit"
              color={tintColor}
              size={24}
            />
          );
        },
      }}
    >
      <Stack.Screen name="home" component={Home} options={{ title: "Home" }} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
