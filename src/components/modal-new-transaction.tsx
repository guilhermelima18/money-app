import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react-native";
import { Dispatch, SetStateAction } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

type ModalNewTransactionProps = {
  showModal: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

export function ModalNewTransaction({
  showModal,
  onClose,
}: ModalNewTransactionProps) {
  return (
    <View>
      <Modal isVisible={showModal}>
        <View className="bg-['#323238'] p-5 rounded-lg">
          <View className="flex-row items-center justify-between mb-10">
            <Text className="text-white text-3xl font-bold">
              Nova transação
            </Text>

            <TouchableOpacity onPress={() => onClose(false)}>
              <X size={32} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-4">
            <View className="flex-col">
              <TextInput
                className="bg-black px-2 py-4 text-white rounded-lg placeholder:text-white"
                placeholder="Descrição"
                autoCapitalize="words"
              />
            </View>

            <View className="flex-col">
              <TextInput
                className="bg-black px-2 py-4 text-white rounded-lg placeholder:text-white"
                placeholder="Valor"
                keyboardType="numeric"
              />
            </View>

            <View className="flex-col">
              <TextInput
                className="bg-black px-2 py-4 text-white rounded-lg placeholder:text-white"
                placeholder="Categoria"
                autoCapitalize="words"
              />
            </View>
          </View>

          <View className="flex-row gap-4 mt-5">
            <TouchableOpacity className="bg-gray-700 flex-1 flex-row items-center justify-center gap-2 rounded-lg p-10">
              <ArrowCircleUp size={32} color="#00875f" />
              <Text className="text-white text-xl">Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-700 flex-1 flex-row items-center justify-center gap-2 rounded-lg p-10">
              <ArrowCircleDown size={32} color="#f75a68" />
              <Text className="text-white text-xl">Saída</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="bg-emerald-600 w-full flex-row items-center justify-center rounded-lg gap-1 p-4 mt-5">
            <Text className="text-white text-lg">Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
