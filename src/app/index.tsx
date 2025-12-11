import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Olá expo router</Text>
      <TouchableOpacity onPress={() => router.navigate("/target")}>
        <Text>Ir para Target</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.navigate("/transaction/1")}>
        <Text>Rota com ID</Text>
      </TouchableOpacity>
    </View>
  );
}
