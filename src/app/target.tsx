import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
export default function Target() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Target</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
}
