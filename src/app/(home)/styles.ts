import { theme } from "@/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const Title = styled.Text`
  font-size: ${theme.FONT_SIZE.XXL}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

export const Text = styled.Text`
  font-size: ${theme.FONT_SIZE.XL}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  margin-top: 10px;
`;

export const ContainerCards = styled.View`
  flex-direction: column;
  margin-top: 50px;
  gap: 20px;
`;

export const ContainerButton = styled.View`
  margin-top: 20px;
`;
