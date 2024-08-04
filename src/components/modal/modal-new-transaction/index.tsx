import { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CaretCircleDown,
  X,
} from "phosphor-react-native";
import { useTransaction } from "@/contexts/transaction";
import { useCategory } from "@/contexts/category";
import { theme } from "@/theme";
import { formatStringCurrency } from "@/helpers/functions";
import { Button } from "@/components/button";
import * as S from "./styles";

const newTransactionSchema = z.object({
  description: z.string({ required_error: "Campo obrigatório" }),
  amount: z.string({ required_error: "Campo obrigatório" }),
  category: z.number({ required_error: "Campo obrigatório" }),
});

type NewTransactionSchemaType = z.infer<typeof newTransactionSchema>;

type ModalNewTransactionProps = {
  showModal: boolean;
  onClose: () => void;
};

type TransactionType = "ENTRADA" | "SAIDA" | "NENHUM";

export function ModalNewTransaction({
  showModal,
  onClose,
}: ModalNewTransactionProps) {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("NENHUM");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewTransactionSchemaType>({
    resolver: zodResolver(newTransactionSchema),
  });

  const { getTransactions, createTransaction } = useTransaction();
  const { categories, getCategories } = useCategory();

  async function handleCreateTransaction(data: NewTransactionSchemaType) {
    if (transactionType === "NENHUM") {
      return Alert.alert("Atenção", "O tipo de transação não foi selecionado.");
    }

    const valor = formatStringCurrency(data.amount);
    const formatValue = valor
      ?.replace(/R\$|\./g, "")
      ?.replace(",", ".")
      ?.trim();

    const result = await createTransaction({
      nome: data?.description,
      tipo: transactionType as TransactionType,
      valor: Number(formatValue),
      data_criacao: new Date().toLocaleDateString(),
      id_categoria: data?.category,
    });

    if (result) {
      await getTransactions();

      setValue("description", "");
      setValue("amount", "");
      setValue("category", 0);

      setTransactionType("NENHUM");

      onClose();
    }
  }

  const categoriesList = useMemo(() => {
    let list;
    if (categories?.length) {
      list = categories.map((category) => ({
        label: category.nome,
        value: category.id,
      }));

      return list;
    }

    return list || [];
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={showModal} onBackdropPress={onClose}>
        <S.ModalContainer>
          <S.ModalHeader>
            <S.Text>Nova transação</S.Text>
            <TouchableOpacity onPress={onClose}>
              <X size={32} color="#333" />
            </TouchableOpacity>
          </S.ModalHeader>

          <S.FormContainer>
            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange } }) => (
                <S.InputContainer>
                  <S.Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Descrição"
                  />
                  {errors?.description?.message && (
                    <S.ErrorText>{errors?.description?.message}</S.ErrorText>
                  )}
                </S.InputContainer>
              )}
            />

            <Controller
              name="amount"
              control={control}
              render={({ field: { value, onChange } }) => (
                <S.InputContainer>
                  <S.Input
                    keyboardType="numeric"
                    value={formatStringCurrency(value)}
                    onChangeText={onChange}
                    placeholder="Valor"
                  />
                  {errors?.amount?.message && (
                    <S.ErrorText>{errors?.amount?.message}</S.ErrorText>
                  )}
                </S.InputContainer>
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field: { value, onChange } }) => (
                <S.InputContainer>
                  <RNPickerSelect
                    value={value}
                    onValueChange={onChange}
                    items={categoriesList}
                    placeholder={{
                      label: "Selecione uma categoria",
                      value: null,
                    }}
                    useNativeAndroidPickerStyle={false}
                    Icon={CaretCircleDown}
                    style={customPickerStyles}
                  />
                  {errors?.category?.message && (
                    <S.ErrorText>{errors?.category?.message}</S.ErrorText>
                  )}
                </S.InputContainer>
              )}
            />

            <S.TransactionTypeContainer>
              <S.ButtonIncoming
                isSelected={transactionType === "ENTRADA"}
                onPress={() => setTransactionType("ENTRADA")}
              >
                <Text style={{ color: theme.COLORS.WHITE }}>Entrada</Text>
                <ArrowCircleUp size={26} color={theme.COLORS.WHITE} />
              </S.ButtonIncoming>

              <S.ButtonOutgoing
                isSelected={transactionType === "SAIDA"}
                onPress={() => setTransactionType("SAIDA")}
              >
                <Text style={{ color: theme.COLORS.WHITE }}>Saída</Text>
                <ArrowCircleDown size={26} color={theme.COLORS.WHITE} />
              </S.ButtonOutgoing>
            </S.TransactionTypeContainer>

            <Button
              variant="solid"
              text="Cadastrar"
              onPress={handleSubmit(handleCreateTransaction)}
            />
          </S.FormContainer>
        </S.ModalContainer>
      </Modal>
    </View>
  );
}

const customPickerStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#cecece",
    borderRadius: 5,
    color: "black",
    paddingRight: 30,
  },
  iconContainer: {
    top: 12,
    right: 10,
    color: "#333",
  },
});
