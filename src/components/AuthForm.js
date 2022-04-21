import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FormControl from "./FormControl";
import Button from "./Button";
import ErrorText from "./ErrorText";

import { validEmail, validPassword, confirmedData } from "../utils/validate";
import colors from "../constants/colors";

const AuthForm = ({ isSignup }) => {
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
  const buttonTitle = isSignup ? "Sign Up" : "Log In";
  const subButtonTitle = isSignup ? "Log in instead" : "Create a new user";

  const hasError =
    formError.emailAddress ||
    formError.confirmEmailAddress ||
    formError.password ||
    formError.confirmPassword;

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

  const buttonClickHandler = () => {
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

    // TODO:
    // Post request here
  };

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

      {hasError && (
        <ErrorText text="Invalid inputs. Please check your data and try again." />
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
