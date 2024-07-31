import { useEffect, useMemo, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
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
import { useCategories } from "@/hooks/use-categories";
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

export function ModalNewTransaction({
  showModal,
  onClose,
}: ModalNewTransactionProps) {
  const [transactionType, setTransactionType] = useState<"ENTRADA" | "SAIDA">();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewTransactionSchemaType>({
    resolver: zodResolver(newTransactionSchema),
  });

  const { categories, getCategories } = useCategories();

  async function handleCreateTransaction(data: NewTransactionSchemaType) {
    const valor = formatStringCurrency(data.amount);
    const formatValue = valor?.replace(/^R\$\s?/, "");

    console.log({
      ...data,
      amount: formatValue,
    });
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

  console.log(categories);

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
