import { LucideIcon} from "lucide-react-native";
import { ColorValue, PressableProps } from "react-native";

export type OptionProps = PressableProps & {
    isSelected: boolean
    title: string
    selectedColor: ColorValue
    icon: LucideIcon
}