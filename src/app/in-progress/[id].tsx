import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction } from "@/components/Transaction";
import { TransactionProps } from "@/types/Transaction";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const details = {
  current: "R$ 580,00",
  target: "R$ 3.000,00",
  percentage: 50,
};

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
  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          onPress: () => {},
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
