import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setToken } from "../store/slices/auth";

import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = !!useSelector((state) => state.auth.token);

  useEffect(() => {
    const getAsyncStorageToken = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!!token) {
        dispatch(setToken({ token }));
      }
    };

    getAsyncStorageToken();
  }, []);

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default Navigation;
