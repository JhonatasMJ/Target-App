import { ListProps } from "@/types/List";
import { styles } from "./styles";
import { FlatList, Text, View } from "react-native";
import { Separator } from "../Separator";
import { colors } from "@/theme";

export function List<T>({
  title,
  emptyMessage,
  containerStyle,
  data,
  renderItem,
  ...rest
}: ListProps<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        {...rest}
      />
    </View>
  );
}
