import { StyleSheet, Pressable, View, Text } from "react-native";

import colors from "../constants/colors";

const Button = ({ onPress, title, containerStyle, titleStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.buttonPressed}
    >
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.titleColor, titleStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.75,
  },
  container: {
    backgroundColor: colors.primary500,
    padding: 8,
    borderRadius: 6,
  },
  titleColor: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
