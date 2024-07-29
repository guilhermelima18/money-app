import { useCallback } from "react";
import { useSQLiteContext } from "expo-sqlite";

type Categories = {
  id: number;
  nome: string;
};

export function useCategories() {
  const database = useSQLiteContext();

  const getCategories = useCallback(async () => {
    const query = "SELECT * FROM categorias";

    try {
      const result = await database.getAllAsync(query);
    } catch (error) {
      console.log("Não foi possível buscar as categorias.");
    }
  }, []);

  const createCategory = useCallback(async (data: Omit<Categories, "id">) => {
    const statement = await database.prepareAsync(
      "INSERT INTO categorias (nome) VALUES ($nome)"
    );

    try {
      const result = await statement.executeAsync({
        $nome: data.nome,
      });
    } catch (error) {
      console.log("Não foi possível cadastrar", error);
    }
  }, []);

  return { getCategories, createCategory };
}
