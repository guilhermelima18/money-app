import { useCallback, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

type Category = {
  id: number;
  nome: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const database = useSQLiteContext();

  const getCategories = useCallback(async () => {
    const query = "SELECT * FROM categorias";

    try {
      const result: Category[] = await database.getAllAsync(query);

      if (result?.length) {
        setCategories(result);
      }
    } catch (error) {
      console.log("Não foi possível buscar as categorias.");
    }
  }, []);

  const createCategory = useCallback(async (data: Omit<Category, "id">) => {
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

  return { categories, getCategories, createCategory };
}
