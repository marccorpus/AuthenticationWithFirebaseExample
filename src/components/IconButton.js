import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ onPress, name, color, size, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        return pressed && styles.buttonPressed;
      }}
    >
      <Ionicons name={name} color={color} size={size} style={style} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.75,
  },
});
