import { LucideIcon } from "lucide-react-native";

export type PageHeaderProps = {
  title: string;
  subTitle?: string;
  rightButton?: {
    icon: LucideIcon;
    onPress: () => void;
  };
};
