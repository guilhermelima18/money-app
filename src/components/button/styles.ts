import { theme } from "@/theme";
import styled from "styled-components/native";

export const ButtonBase = styled.TouchableOpacity`
  width: 320px;
  padding: 15px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const ButtonSolid = styled(ButtonBase)`
  background-color: ${theme.COLORS.EMERALD_500};
`;

export const ButtonOutline = styled(ButtonBase)`
  border: 1px solid ${theme.COLORS.GRAY_200};
`;

export const ButtonSolidText = styled.Text`
  color: ${theme.COLORS.WHITE};
`;

export const ButtonOutlineText = styled.Text`
  color: ${theme.COLORS.GRAY_800};
`;
