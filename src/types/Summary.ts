import * as LucideIcon from "lucide-react-native/icons";

export type SummaryProps = {
    label: string;
    value: string;
}

export type IconProps = {
    name: keyof typeof LucideIcon;
    color: string;
    size: number
}

export type Props = {
    data: SummaryProps
    icon: IconProps
    isRight?: boolean
}