import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { Text, View } from "react-native";
import { Props } from "@/types/HomeHeader";
import { Separator } from "../Separator";
import { Summary } from "../Summary";


export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>
      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={data.input}
          icon={{ name: "ArrowUp", size: 16, color: colors.green[500] }}
        />
         <Summary
          isLeft={true}
          data={data.output}
          icon={{ name: "ArrowDown", size: 16, color: colors.red[400] }}
        />
      </View>
    </LinearGradient>
  );
}
