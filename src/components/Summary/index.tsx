import { Props } from "@/types/Summary";
import { View, Text } from "react-native";
import { styles } from "./styles";
import * as LucideIcon from "lucide-react-native/icons";

export function Summary({ data, icon, isLeft = false }: Props) {
  const Icon = LucideIcon[icon.name];
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          isLeft && {
            justifyContent: "flex-end",
          },
        ]}
      >
        {Icon && <Icon color={icon.color} size={icon.size} />}
        <Text style={styles.label}>{data.label}</Text>
      </View>
      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
}
