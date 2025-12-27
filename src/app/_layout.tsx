import { colors } from "@/theme/colors";
import { Stack } from "expo-router";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Loading } from "@/components/Loading";

/* Pega todas as rotas da pasta app e passa para o Slot */
/* Posso definir diretamente o tipo de navegação 'Tabs' ou 'Stack' */

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

    if (!fontsLoaded) { 
        return <Loading/>
    }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    />
  );
}
