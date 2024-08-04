import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useSQLiteContext } from "expo-sqlite";

type Category = {
  id: number;
  nome: string;
};

type CategoryProviderProps = {
  children: ReactNode;
};

type CategoryContextProps = {
  categories: Category[];
  getCategories: () => Promise<void>;
  createCategory: (data: Omit<Category, "id">) => Promise<void>;
};

export const CategoryContext = createContext({} as CategoryContextProps);

export function CategoryProvider({ children }: CategoryProviderProps) {
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

  return (
    <CategoryContext.Provider
      value={{ categories, getCategories, createCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => useContext(CategoryContext);
