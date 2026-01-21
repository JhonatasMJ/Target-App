import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTarget } from "@/database/useTarget";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const params = useLocalSearchParams<{ id?: string }>();
  const targetDataBase = useTarget();
  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Toast.show({ type: "error", text1: "Meta inválida" });
    }

    setIsProcessing(true);

    /* Se carrega id vai ser UPDATE */
    if (params.id) {
      
    } else {
      create();
    }

    async function create() {
      await targetDataBase.create({ name, amount });
      try {
        Alert.alert("Nova Meta", "Meta criada com sucesso!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } catch {
        Alert.alert("Erro", "Nao foi possivel criar a meta");
        setIsProcessing(false);
      }
    }
  }

  /* Só chama a função caso tenha o id */
  useEffect(() =>{
    if (params.id) {
      fetchDetails(Number(params.id))
    }
  },[params.id])

  async function fetchDetails(id:number) {
    try {
      const response = await targetDataBase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta");
      console.log(error);
    }
  }

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
          onChangeText={setName}
          value={name}
        />
        <CurrencyInput
          label="Valor Alvo"
          placeholder="R$ 1.000,00"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          onPress={handleSave}
          title="Salvar"
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}
