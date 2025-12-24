import { TouchableOpacity, View, Text } from "react-native";
import { styles } from "./styles";
import { Props } from "@/types/Target";
import { ChevronRight } from "lucide-react-native";

export function Target({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={styles.status}>
          {data.percentage} • {data.current} de {data.target}
        </Text>
      </View>
      <ChevronRight size={20} />
    </TouchableOpacity>
  );
}
