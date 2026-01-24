import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction } from "@/components/Transaction";
import { useTarget } from "@/database/useTarget";
import { useTransactions } from "@/database/useTransactions";
import { TransactionProps } from "@/types/Transaction";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Pencil } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";


export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const params = useLocalSearchParams();
  const targetDatabase = useTarget();
  const transactionsDatabase = useTransactions();
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  async function fetchTargetDetails() {
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

  async function fetchTransaction() {
    try {
      const response = await transactionsDatabase.listByTargetId(Number(params.id));
      setTransactions (
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: String(item.created_at),
          description: item.observation,
          type: item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        }))
      )

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações");
      console.log(error);}
  }
 
/* Recarrega a lista toda vez que eu entrar na tela */
  async function fetchData () {
    const fetchDetailsPromisse = fetchTargetDetails();
    const fetchTransactionsPromise = fetchTransaction();
    await Promise.all([fetchDetailsPromisse, fetchTransactionsPromise]);
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
          icon: Pencil,
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
