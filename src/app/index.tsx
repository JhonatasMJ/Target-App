import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { View } from "react-native";


const summaryData = {
  total: "R$2.680,00",
  input: { label: "Entradas", value: "R$ 6,184.90" },
  output: { label: "Saídas", value: "-R$ 883.65" }
}

const targetData = [
   {
    name: "Viagem",
    percentage: "50%",
    current: "R$1.340,00",
    target: "R$2.680,00"
  }
]

export default function Index() {
    
  return (
    <View style={{ flex: 1, }}>
      <HomeHeader data={summaryData} />
      <Target data={targetData[0]} />
    </View>
  );
}
  