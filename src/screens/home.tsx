import { View, Text } from "react-native";
import { Money } from "phosphor-react-native";
import { CardSummary } from "@/components/card-summary";

export function Home() {
  return (
    <View className="bg-['#202024'] flex-1">
      <View className="flex-col gap-2 mt-10 p-5">
        <View className="flex-row items-center gap-2">
          <Money size={32} color="#fff" />
          <Text className="text-2xl text-white">Money App</Text>
        </View>
        <Text className="text-lg text-white">Gerencie suas finanças!</Text>
      </View>

      <View className="flex-col items-center justify-center gap-4 mt-10">
        <CardSummary type="Entradas" amount={17500} date="21 de julho" />
        <CardSummary type="Saídas" amount={500} date="19 de julho" />
      </View>
    </View>
  );
}
