import { TouchableOpacityProps } from "react-native"

export type TargetProps = {
    id?: string
    name: string
    percentage: string
    current: string
    target: string
}

export type Props = TouchableOpacityProps & {
    data: TargetProps
}