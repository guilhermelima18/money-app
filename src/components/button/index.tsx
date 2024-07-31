import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";
import { ReactNode } from "react";

type ButtonProps = TouchableOpacityProps & {
  variant: "solid" | "outline";
  text: string;
  icon?: ReactNode;
};

export function Button({ variant, text, icon, ...props }: ButtonProps) {
  return (
    <>
      {variant === "outline" && (
        <S.ButtonOutline {...props}>
          {icon && icon}
          <S.ButtonOutlineText>{text}</S.ButtonOutlineText>
        </S.ButtonOutline>
      )}
      {variant === "solid" && (
        <S.ButtonSolid {...props}>
          {icon && icon}
          <S.ButtonSolidText>{text}</S.ButtonSolidText>
        </S.ButtonSolid>
      )}
    </>
  );
}
