import { IconProps } from "./Summary"


export type PageHeaderProps = {
    title: string
    subTitle?: string
    rightButton?: {
        onPress: () => void
        icon: IconProps
    }
}