import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { PageHeaderProps } from "@/types/PageHeader";
import { router } from "expo-router";
import { ArrowLeft, Edit, Icon } from "lucide-react-native";
import { colors } from "@/theme";

export function PageHeader({ title, subTitle, rightButton }: PageHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}>
          <ArrowLeft size={32} color={colors.black} />
        </TouchableOpacity>
      {rightButton && (
        <TouchableOpacity activeOpacity={0.8} onPress={rightButton.onPress}>
          <Edit size={24} color={colors.gray[500]} />
        </TouchableOpacity>
      )}
      </View>


      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
}
