import { StyleSheet, View, Text, TextInput } from "react-native";

import colors from "../constants/colors";

const FormControl = ({ label, textInputConfig, isError }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, isError && styles.labelError]}>{label}</Text>
      <TextInput
        style={[styles.textInput, isError && styles.textInputError]}
        {...textInputConfig}
      />
    </View>
  );
};

export default FormControl;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    color: colors.primary100,
  },
  labelError: {
    color: colors.error500,
  },
  textInput: {
    backgroundColor: colors.primary100,
    padding: 8,
    marginTop: 8,
    borderRadius: 6,
    fontSize: 16,
  },
  textInputError: {
    backgroundColor: colors.error100,
  },
});
