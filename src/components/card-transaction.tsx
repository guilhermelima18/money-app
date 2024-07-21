import { Text, View } from "react-native";
import { formatMoney } from "@/helpers/functions";

type CardTransactionProps = {
  transaction: string;
  amount: number;
  type: "entrada" | "saida";
  category: string;
  date: string;
};

export function CardTransaction({
  transaction,
  amount,
  type,
  category,
  date,
}: CardTransactionProps) {
  return (
    <View className="bg-['#323238'] w-[80%] flex-col p-5 rounded-lg">
      <View className="flex-col gap-2">
        <Text className="text-lg text-white">{transaction}</Text>
        {type === "entrada" ? (
          <Text className="text-4xl text-['#00875f'] font-bold">
            {formatMoney(amount)}
          </Text>
        ) : (
          <Text className="text-4xl text-['#f75a68'] font-bold">
            {formatMoney(amount)}
          </Text>
        )}
      </View>

      <View className="flex-row items-center justify-between mt-6">
        <Text className="text-lg text-gray-400">{category}</Text>
        <Text className="text-sm text-gray-400">{date}</Text>
      </View>
    </View>
  );
}
