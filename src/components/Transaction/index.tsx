import { Props } from "@/types/Transaction";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { ArrowDown, ArrowUp, X } from "lucide-react-native";
import { colors } from "@/theme";

export function Transaction({ data, onRemove }: Props) {
  return (
    <View style={styles.container}>
      {data.type === TransactionTypes.Input ? (
        <ArrowUp size={20} color={colors.blue[500]} />
      ) : (
        <ArrowDown size={20} color={colors.red[400]} />
      )}

      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {data.date} {data.description && `• ${data.description}`}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
            <X size={18} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  );
}
