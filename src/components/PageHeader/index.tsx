import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { PageHeaderProps } from "@/types/PageHeader";
import { router } from "expo-router";
import { ArrowLeft} from "lucide-react-native";
import { colors } from "@/theme";

export function PageHeader({ title, subTitle, rightButton }: PageHeaderProps) {
  const Icon = rightButton?.icon;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <ArrowLeft size={32} color={colors.black} />
        </TouchableOpacity>
      {rightButton && Icon && (
        <TouchableOpacity activeOpacity={0.8} onPress={rightButton.onPress}>
            <Icon size={24} color="#666" />
        </TouchableOpacity>
      )}
      </View>


      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
}
