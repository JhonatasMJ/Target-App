import { useSQLiteContext } from "expo-sqlite";

export type TargetCreate = {
  name: string
  amount: number
};

export type TargetResponse = {
  id: number
  name: string
  amount: number
  current: number
  percentage: number
  created_at: Date
  updated_at: Date
}

export function useTarget() {
  const database = useSQLiteContext();
  async function create(data: TargetCreate) {
    const statement = await database.prepareAsync(
      "INSERT INTO targets (name, amount) VALUES ($name, $amount)"
    );

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    });
  }


  /* Lista todas as metas da tabela, faz um join com a tabela transactions para pegar o current, e caso o current seja null ele retorna 0, para pegar o percentage vai dividir o current pelo amount, caso o amount seja 0 ele retorna 0 e ordena do maior pro menor current */

  function listBySavedValue () {
    return database.getAllAsync<TargetResponse>(`
      SELECT
        targets.id,
        targets.name,
        targets.amount,
        COALESCE(SUM(transactions.amount), 0) AS current,
        COALESCE((SUM(transactions.amount) / targets.amount) * 100 , 0) AS percentage
      FROM targets
      LEFT JOIN transactions ON targets.id = transactions.target_id
      GROUP BY targets.id, targets.name, targets.amount
      ORDER BY current DESC
      `)
  }

  return {
    create,
    listBySavedValue
  };
}
