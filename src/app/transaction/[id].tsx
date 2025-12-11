import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Transaction() {
  const params = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ID: {params.id}</Text>
      <Text>Nome: {params.name}</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
}
