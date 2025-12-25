import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create ({
    container: {
        width: '100%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue[500],
        borderRadius: 8,

    },
    title:{
        fontFamily: fontFamily.medium,
        fontSize: 14,
        color: colors.white,
    }
})