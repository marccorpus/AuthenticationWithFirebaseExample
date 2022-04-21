import { StyleSheet, Text } from "react-native";

import colors from "../constants/colors";

const ErrorText = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

export default ErrorText;

const styles = StyleSheet.create({
  text: {
    color: colors.error100,
  },
});
