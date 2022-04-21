import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
  <Stack.Navigator>
    <Stack.Screen name="home" component={Home} />
  </Stack.Navigator>;
};

export default AuthenticatedStack;
