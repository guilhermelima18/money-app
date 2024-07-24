import { theme } from "@/theme";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 320px;
  height: 180px;
  border: 1px solid ${theme.COLORS.GRAY_200};
  flex-direction: column;
  padding: 20px;
  border-radius: 5px;
`;

export const TypeSummaryContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const TypeSummaryText = styled.Text`
  font-size: ${theme.FONT_SIZE.XL}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.GRAY_600};
`;

export const Amount = styled.Text`
  font-size: ${theme.FONT_SIZE.XXXL}px;
  font-family: ${theme.FONT_FAMILY.BOLD};
  color: ${theme.COLORS.GRAY_800};
`;

export const Date = styled.Text`
  font-size: ${theme.FONT_SIZE.LG}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.GRAY_300};
  margin-top: 10px;
`;
