import { theme } from "@/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const LogoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Title = styled.Text`
  font-size: ${theme.FONT_SIZE.XL}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
`;

export const ContainerCards = styled.View`
  flex-direction: column;
  margin-top: 30px;
  gap: 20px;
`;

export const ContainerButton = styled.View`
  width: 320px;
  margin: 20px auto 0 auto;
`;
