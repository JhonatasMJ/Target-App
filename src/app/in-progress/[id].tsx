import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction } from "@/components/Transaction";
import { useTarget } from "@/database/useTarget";
import { TransactionProps } from "@/types/Transaction";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

const transactions: TransactionProps[] = [
  {
    id: "1",
    type: TransactionTypes.Input,
    description: "CDB de 110% no banco XPTO",
    value: "R$ 300,00",
    date: "12/04/25",
  },
  {
    id: "2",
    type: TransactionTypes.Output,
    value: "R$ 20,00",
    date: "12/04/25",
  },
];

export default function InProgress() {
  const params = useLocalSearchParams();
  const targetDatabase = useTarget();
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      })
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta");
      console.log(error);
    }
  }

/* Recarrega a lista toda vez que eu entrar na tela */
  async function fetchData () {
    const fetchDetailsPromisse = fetchDetails();
    await Promise.all([fetchDetailsPromisse]);
    setIsFetching(false);
  }

  /* Recarrega a lista toda vez que eu entrar na tela novamente, recomendado usar com useCallback */
    useFocusEffect(
      useCallback(() =>{
        fetchData();
      },[])
    )

    if(isFetching) { 
      return <Loading/>
    }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro dinheiro aqui."
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
      />

      <Button
        title="Nova Transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
