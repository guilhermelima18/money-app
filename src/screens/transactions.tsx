import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PlusCircle } from "phosphor-react-native";
import { CardTransaction } from "@/components/card-transaction";
import { ModalNewTransaction } from "@/components/modal-new-transaction";

export function Transactions() {
  const [showModalNewTransaction, setShowModalNewTransaction] = useState(false);

  function onToggleModalNewTransaction() {
    setShowModalNewTransaction(!showModalNewTransaction);
  }

  return (
    <View className="bg-['#202024'] flex-1">
      <View className="w-[80%] flex-row justify-center mx-auto mt-10">
        <TouchableOpacity
          className="bg-emerald-600 w-full flex-row items-center justify-center rounded-lg gap-1 p-4"
          onPress={onToggleModalNewTransaction}
        >
          <PlusCircle size={32} color="#fff" />
          <Text className="text-white text-lg">Nova transação</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center gap-4 mt-10">
        <CardTransaction
          transaction="Desenvolvimento de site"
          amount={12000}
          type="entrada"
          category="Venda"
          date="13/04/2024"
        />

        <CardTransaction
          transaction="Hamburguer"
          amount={120}
          type="saida"
          category="Alimentação"
          date="13/04/2024"
        />
      </View>

      <ModalNewTransaction
        showModal={showModalNewTransaction}
        onClose={setShowModalNewTransaction}
      />
    </View>
  );
}
