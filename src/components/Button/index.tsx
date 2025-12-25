import { ButtonProps } from "@/types/Button";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

export function Button({ title, isProcessing = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      disabled={isProcessing}
      {...rest}
    >
      <Text style={styles.title}>
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}
