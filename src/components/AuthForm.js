import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import FormControl from "./FormControl";
import Button from "./Button";
import Loading from "./Loading";

import { login, signup } from "../api/auth";
import { setToken } from "../store/slices/auth";
import { validEmail, validPassword, confirmedData } from "../utils/validate";
import colors from "../constants/colors";

const AuthForm = ({ isSignup }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    emailAddress: "",
    confirmEmailAddress: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({
    emailAddress: false,
    confirmEmailAddress: false,
    password: false,
    confirmPassword: false,
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const buttonTitle = isSignup ? "Sign Up" : "Log In";
  const subButtonTitle = isSignup ? "Log in instead" : "Create a new user";

  const subButtonClickHandler = () => {
    let screen = "login";

    if (!isSignup) {
      screen = "signup";
    }

    navigation.replace(screen);
  };

  const inputChangeHandler = (key, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [key]: value }));

    setFormError((prevFormError) => ({ ...prevFormError, [key]: false }));
  };

  const buttonClickHandler = async () => {
    const isEmailValid = validEmail(formData.emailAddress);
    const isConfirmEmailValid = isSignup
      ? validEmail(formData.confirmEmailAddress) &&
        confirmedData(formData.emailAddress, formData.confirmEmailAddress)
      : true;
    const isPasswordValid = validPassword(formData.password);
    const isConfirmPasswordValid = isSignup
      ? validPassword(formData.confirmPassword) &&
        confirmedData(formData.password, formData.confirmPassword)
      : true;

    if (
      !isEmailValid ||
      !isConfirmEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      setFormError({
        emailAddress: !isEmailValid,
        confirmEmailAddress: !isConfirmEmailValid,
        password: !isPasswordValid,
        confirmPassword: !isConfirmPasswordValid,
      });

      return;
    }

    const { emailAddress: email, password } = formData;

    setIsLoading(true);

    try {
      const token = isSignup
        ? await signup({ email, password })
        : await login({ email, password });

      dispatch(setToken({ token }));

      AsyncStorage.setItem("token", token);
    } catch (error) {
      let msg = "Invalid email address/password.";

      if (isSignup) {
        msg = error.response.data.error.message;
      }

      setIsLoading(false);

      Alert.alert("Error", msg);
    }
  };

  if (isLoading) {
    return <Loading size="large" color={colors.primary500} />;
  }

  return (
    <View style={styles.container}>
      <FormControl
        label="Email Address"
        textInputConfig={{
          value: formData.emailAddress,
          onChangeText: (value) => inputChangeHandler("emailAddress", value),
        }}
        isError={formError.emailAddress}
      />

      {isSignup && (
        <FormControl
          label="Confirm Email Address"
          textInputConfig={{
            value: formData.confirmEmailAddress,
            onChangeText: (value) =>
              inputChangeHandler("confirmEmailAddress", value),
          }}
          isError={formError.confirmEmailAddress}
        />
      )}

      <FormControl
        label="Password"
        textInputConfig={{
          secureTextEntry: true,
          value: formData.password,
          onChangeText: (value) => inputChangeHandler("password", value),
        }}
        isError={formError.password}
      />

      {isSignup && (
        <FormControl
          label="Confirm Password"
          textInputConfig={{
            secureTextEntry: true,
            value: formData.confirmPassword,
            onChangeText: (value) =>
              inputChangeHandler("confirmPassword", value),
          }}
          isError={formError.confirmPassword}
        />
      )}

      <Button
        onPress={buttonClickHandler}
        title={buttonTitle}
        containerStyle={styles.buttonContainerStyle}
      />

      <Button
        onPress={subButtonClickHandler}
        title={subButtonTitle}
        containerStyle={styles.subButtonContainerStyle}
        titleStyle={styles.subButtonTitleStyle}
      />
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary800,
    marginTop: 64,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
  },
  buttonContainerStyle: {
    marginTop: 16,
  },
  subButtonContainerStyle: {
    marginTop: 8,
    backgroundColor: "transparent",
  },
  subButtonTitleStyle: {
    fontWeight: "normal",
  },
});
