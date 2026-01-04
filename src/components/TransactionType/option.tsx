import { OptionProps } from "@/types/Option";
import { Pressable, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

export function Option({
  isSelected,
  title,
  selectedColor,
  icon: Icon,
  ...rest
}: OptionProps) {
  return (
    <Pressable
    style={[
      styles.option,
      isSelected && {
        backgroundColor: selectedColor,
      },
    ]}
    {...rest}
    >
      <Icon size={24} color={isSelected ? colors.white : colors.gray[500]} />

      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  );
}
