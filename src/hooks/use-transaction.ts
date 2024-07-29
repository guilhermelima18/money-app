import { useCallback, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

type Transactions = {
  id: number;
  nome: string;
  tipo: string;
  valor: number;
  data_criacao: string;
  id_categoria: number;
};

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const database = useSQLiteContext();

  const getTransactions = useCallback(async () => {
    const query = "SELECT * FROM transacoes";

    try {
      const result: Transactions[] = await database.getAllAsync(query);

      if (result?.length) {
        setTransactions(result);
      }
    } catch (error) {
      console.log("Não foi possível buscar as transações.");
    }
  }, []);

  const createTransaction = useCallback(
    async (data: Omit<Transactions, "id">) => {
      const statement = await database.prepareAsync(
        `INSERT INTO transacoes (nome, tipo, valor, data_criacao, id_categoria)
      VALUES ($nome, $tipo, $valor, $data_criacao, $id_categoria)`
      );

      try {
        const result = await statement.executeAsync({
          $nome: data.nome,
          $tipo: data.tipo,
          $valor: data.valor,
          $data_criacao: data.data_criacao,
          $id_categoria: data.id_categoria,
        });
      } catch (error) {
        console.log("Não foi possível cadastrar", error);
      }
    },
    []
  );

  return { transactions, getTransactions, createTransaction };
}
