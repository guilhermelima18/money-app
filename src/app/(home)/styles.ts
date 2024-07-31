import { theme } from "@/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 88px;
`;

export const LogoContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Text = styled.Text`
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const ContainerCards = styled.View`
  flex-direction: column;
  margin-top: 30px;
  gap: 20px;
`;

export const ContainerButton = styled.View`
  width: 150px;
`;
