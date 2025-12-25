import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function InProgress() {
  const params = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ID: {params.id}</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
}
