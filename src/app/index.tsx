import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { Target } from "@/components/Target";
import { useTarget } from "@/database/useTarget";
import { TargetProps } from "@/types/Target";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";

const summaryData = {
  total: "R$2.680,00",
  input: { label: "Entradas", value: "R$ 6,184.90" },
  output: { label: "Saídas", value: "-R$ 883.65" },
};



export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const targetDatabase = useTarget();
  const [targets,setTargets] = useState<TargetProps>([]);

  async function fetchTargets ():Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue();

       return response.map((item) => ({
          id: String(item.id),
          name: item.name,
          current: String(item.current),
          percentage: item.percentage.toFixed(0) + "%",
          target: String(item.amount),
       }))

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas");
      console.log(error);
    }
  }


  async function fetchData () {
    const targetDataPromisse = fetchTargets();

    /* Pega todas as promessas e centrliza em um lugar só */
    const [targetData] = await Promise.all([targetDataPromisse])
    setTargets(targetData);
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
      <HomeHeader data={summaryData} />
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
