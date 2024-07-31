import styled from "styled-components/native";
import { theme } from "@/theme";

type ButtonIncomingProps = {
  isSelected: boolean;
};

export const ModalContainer = styled.View`
  background-color: ${theme.COLORS.WHITE};
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

export const ModalHeader = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.Text`
  font-size: ${theme.FONT_SIZE.XL}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const FormContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled.TextInput`
  width: 100%;
  border: 1px solid ${theme.COLORS.GRAY_200};
  padding: 10px;
  border-radius: 5px;
`;

export const TransactionTypeContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 10px 0;
`;

export const ButtonIncoming = styled.TouchableOpacity<ButtonIncomingProps>`
  background-color: ${({ isSelected }: ButtonIncomingProps) =>
    isSelected ? theme.COLORS.GRAY_200 : theme.COLORS.EMERALD_500};
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 20px;
  border-radius: 5px;
`;

export const ButtonOutgoing = styled.TouchableOpacity`
  background-color: ${({ isSelected }: ButtonIncomingProps) =>
    isSelected ? theme.COLORS.GRAY_200 : theme.COLORS.RED_500};
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 20px;
  border-radius: 5px;
`;

export const ErrorText = styled.Text`
  font-size: ${theme.FONT_SIZE.XS}px;
  color: ${theme.COLORS.RED_500};
`;
