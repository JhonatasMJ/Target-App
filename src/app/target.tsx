import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTarget } from "@/database/useTarget";
import { router, useLocalSearchParams } from "expo-router";
import {  Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
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
      update();
    } else {
      create();
    }

    async function update() {
      try {
        await targetDataBase.update({
          id: Number(params.id),
          name,
          amount,
        })
        Alert.alert("Meta Atualizada", "Meta atualizada com sucesso!", [
          {
            text: "OK",
            onPress: () => router.back(),
          }
        ])
      } catch (error) {
        Alert.alert("Erro", "Nao foi possivel atualizar a meta");
        console.log(error);
        setIsProcessing(false);
      }
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

  function handleRemove () {
    if (!params.id) return;

    Alert.alert("Remover", "Deseja realmente remover?", [
      {text: "Não", style: "cancel"},
      {text: "Sim", onPress: remove}
    ])
  }

  async function remove() {
    try {
      setIsProcessing(true);
      await targetDataBase.remove(Number(params.id));
      Alert.alert("Meta Removida", "Meta removida com sucesso!",[
        {text: "Ok", onPress: () => router.replace("/")}
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a meta");
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content"/>
      <PageHeader
        title="Meta"
        subTitle="Economize para alcançar sua meta financeira."
        rightButton={
          params.id ? {icon: Trash2, onPress: handleRemove} : undefined
        }
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
