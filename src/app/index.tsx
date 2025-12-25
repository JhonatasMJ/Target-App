import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { router } from "expo-router";
import { View } from "react-native";

const summaryData = {
  total: "R$2.680,00",
  input: { label: "Entradas", value: "R$ 6,184.90" },
  output: { label: "Saídas", value: "-R$ 883.65" },
};

const targetData = [
  {
    id: "1",
    name: "Viagem",
    percentage: "50%",
    current: "R$1.340,00",
    target: "R$2.680,00",
  },
  {
    id: "2",
    name: "Carro",
    percentage: "50%",
    current: "R$1.340,00",
    target: "R$2.680,00",
  },
  {
    id: "3",
    name: "Casa",
    percentage: "50%",
    current: "R$1.340,00",
    target: "R$2.680,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summaryData} />
      <List
        title="Metas"
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        keyExtractor={(item) => item.id}
        data={ targetData }
        renderItem={({ item }) => <Target data={item} onPress={() => router.navigate(`/in-progress/${item.id}`)} />}
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24 , paddingBottom: 32 }}>
        <Button onPress={()=> router.navigate("/target")}  title="Nova Meta" />
      </View>
    </View>
  );
}
