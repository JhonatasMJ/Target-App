import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { Target } from "@/components/Target";
import { useTarget } from "@/database/useTarget";
import { useTransactions } from "@/database/useTransactions";
import { homeHeaderProps } from "@/types/HomeHeader";
import { TargetProps } from "@/types/Target";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";

export default function Index() {
  const [summary, setSummary] = useState<homeHeaderProps>()
  const [isFetching, setIsFetching] = useState(true);
  const targetDatabase = useTarget();
  const [targets,setTargets] = useState<TargetProps[]>();
  const transactionDatabase = useTransactions();

  async function fetchTargets ():Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listByPercentageValue();

       return response.map((item) => ({
          id: String(item.id),
          name: item.name,
          current: numberToCurrency(item.current),
          percentage: item.percentage.toFixed(0) + "%",
          target: numberToCurrency(item.amount),
       }))

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas");
      console.log(error);
    }
  }

/* Pega dados do resumo */
async function fetchSummary ():Promise<homeHeaderProps> {
  try {
    const response = await transactionDatabase.summary();
    return {
      total: numberToCurrency(response.input - response.output),
      input: {
        label: "Entradas",
        value: numberToCurrency(response.input),
      },
        output: {
        label: "Saídas",
        value: numberToCurrency(response.output),
      }
    }
  } catch (error) {
    Alert.alert("Erro", "Não foi possível carregar o resumo");
    console.log(error);
}
}

  async function fetchData () {
    const targetDataPromisse = fetchTargets();
    const fetchDataSummaryPromise = fetchSummary()

    /* Pega todas as promessas e centrliza em um lugar só */
    const [targetData, dataSummary ] = await Promise.all([targetDataPromisse, fetchDataSummaryPromise]);
    setTargets(targetData);
    setSummary(dataSummary);
    setIsFetching(false);
  }


/* Recarrega a lista toda vez que eu entrar na tela novamente, recomendado usar com useCallback */
  useFocusEffect(
    useCallback(() =>{
      fetchData();
    },[])
  )

  if(isFetching) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content"/>
      <HomeHeader data={summary} />
      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhuma meta. Toque em nova meta para criar."
        renderItem={({ item }) => <Target data={item} onPress={() => router.navigate(`/in-progress/${item.id}`)} />}
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24 , paddingBottom: 32 }}>
        <Button onPress={()=> router.navigate("/target")}  title="Nova Meta" />
      </View>
    </View>
  );
}
