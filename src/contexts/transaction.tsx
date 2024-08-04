import { SQLiteExecuteAsyncResult, useSQLiteContext } from "expo-sqlite";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type Transaction = {
  id?: number;
  nome: string;
  tipo: string;
  valor: number;
  data_criacao: string;
  id_categoria: number;
};

type TransactionProviderProps = {
  children: ReactNode;
};

type TransactionContextProps = {
  transactions: Transaction[];
  getTransactions: () => Promise<void>;
  createTransaction: (
    data: Omit<Transaction, "id">
  ) => Promise<SQLiteExecuteAsyncResult<unknown> | undefined>;
};

export const TransactionContext = createContext({} as TransactionContextProps);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const database = useSQLiteContext();

  const getTransactions = useCallback(async () => {
    const query = "SELECT * FROM transacoes";

    try {
      const result: Transaction[] = await database.getAllAsync(query);

      if (result?.length) {
        setTransactions(result);
      }
    } catch (error) {
      console.log("Não foi possível buscar as transações.");
    }
  }, []);

  const createTransaction = useCallback(
    async (data: Omit<Transaction, "id">) => {
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

        return result;
      } catch (error) {
        console.log("Não foi possível cadastrar", error);
      }
    },
    []
  );

  return (
    <TransactionContext.Provider
      value={{ transactions, getTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransaction = () => useContext(TransactionContext);
