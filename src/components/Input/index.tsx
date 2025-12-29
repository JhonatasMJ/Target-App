import { InputProps } from "@/types/Input";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

export function Input({ label, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...rest}
        placeholderTextColor={colors.gray[400]}
      />
    </View>
  );
}
