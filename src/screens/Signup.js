import { StyleSheet, View } from "react-native";

import AuthForm from "../components/AuthForm";

import colors from "../constants/colors";

const Signup = () => {
  return (
    <View style={styles.container}>
      <AuthForm isSignup />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary100,
  },
});
