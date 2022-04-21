import { StyleSheet, View, Text } from "react-native";

import AuthForm from "../components/AuthForm";

import colors from "../constants/colors";

const Login = () => {
  return (
    <View style={styles.container}>
      <AuthForm />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary100,
  },
});
