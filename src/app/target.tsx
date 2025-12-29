import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Meta"
        subTitle="Economize para alcançar sua meta financeira."
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da Meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
        />
        <CurrencyInput label="Valor Alvo" placeholder="R$ 1.000,00" value={0} />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
