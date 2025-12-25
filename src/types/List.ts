import { FlatListProps, StyleProp, ViewStyle } from "react-native";

export type ListProps <T> = FlatListProps<T> & {
    title:string,
    emptyMessage?: string;
    containerStyle?: StyleProp<ViewStyle>
}



