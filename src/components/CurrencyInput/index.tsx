import { InputCurrencyProps} from "@/types/Input";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";
import Input from 'react-native-currency-input';


export function CurrencyInput({ label, ...rest }: InputCurrencyProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        {...rest}
        placeholderTextColor={colors.gray[400]}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
      />
    </View>
  );
}
