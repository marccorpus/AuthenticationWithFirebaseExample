import { StyleSheet, View } from "react-native";

import FormControl from "./FormControl";
import Button from "./Button";

import colors from "../constants/colors";

const AuthForm = ({ isSignup }) => {
  const buttonTitle = isSignup ? "Sign Up" : "Log In";
  const subButtonTitle = isSignup ? "Create a new user" : "Log in instead";

  return (
    <View style={styles.container}>
      <FormControl label="Email Address" />

      {isSignup && <FormControl label="Confirm Email Address" />}

      <FormControl
        label="Password"
        textInputConfig={{ secureTextEntry: true }}
      />

      {isSignup && (
        <FormControl
          label="Confirm Password"
          textInputConfig={{ secureTextEntry: true }}
        />
      )}

      <Button
        onPress={null}
        title={buttonTitle}
        containerStyle={styles.buttonContainerStyle}
      />

      <Button
        onPress={null}
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
    marginVertical: 2,
    backgroundColor: "transparent",
  },
  subButtonTitleStyle: {
    fontWeight: "normal",
  },
});
