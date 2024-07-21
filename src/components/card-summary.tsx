import { Text, View } from "react-native";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react-native";
import { formatMoney } from "@/helpers/functions";

type CardSummaryProps = {
  type: "Entradas" | "Saídas";
  amount: number;
  date: string;
};

export function CardSummary({ type, amount, date }: CardSummaryProps) {
  return (
    <View className="bg-['#323238'] w-[80%] flex-col p-5 rounded-lg">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg text-white">{type}</Text>
        {type === "Entradas" ? (
          <ArrowCircleUp size={32} color="#00875f" />
        ) : (
          <ArrowCircleDown size={32} color="#f75a68" />
        )}
      </View>

      <View className="flex-col gap-4 mt-6">
        <Text className="text-4xl text-white">{formatMoney(amount)}</Text>
        <Text className="text-sm text-white">
          Última movimentação em {date}
        </Text>
      </View>
    </View>
  );
}
