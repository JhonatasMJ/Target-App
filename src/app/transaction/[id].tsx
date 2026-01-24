import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";
import { useTransactions } from "@/database/useTransactions";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState("");
  const [type, setType] = useState(TransactionTypes.Input);
  const [isCreating, setIsCreating] = useState(false);
  const params = useLocalSearchParams<{ id: string }>();
  const isInvalidAmount = amount <= 0;
  const transactionsDatabase = useTransactions();

  async function handleCreate() {
    try {
      if (isInvalidAmount) {
        Alert.alert(
          "Atenção!",
          "Preencha o valor. A transação deve ser maior que 0.",
        );
      }
      setIsCreating(true);

      await transactionsDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      })

      Alert.alert("Sucesso", "Transação criada com sucesso!", [
        {text: "Ok", onPress: () => router.back()}
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.");
      console.log(error);
      setIsCreating(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova Transação"
        subTitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar"
      />

      <View style={{ marginTop: 32, gap: 24 }}>
        <TransactionType selected={type} onChange={setType} />
        <View>
          <CurrencyInput
            label="Valor (R$)"
            placeholder="Digite o valor"
            value={amount}
            onChangeValue={setAmount}
          />
          {isInvalidAmount && (
            <Text style={{ color: "red", marginTop: 6 }}>
              Por favor, insira um valor válido.
            </Text>
          )}
        </View>

        <Input
          onChangeText={setObservation}
          label="Motivo (opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
        />

        <Button
          isProcessing={isCreating}
          onPress={handleCreate}
          title="Salvar"
        />
      </View>
    </View>
  );
}
