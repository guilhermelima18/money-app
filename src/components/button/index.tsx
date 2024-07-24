import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type ButtonProps = TouchableOpacityProps & {
  variant: "solid" | "outline";
  text: string;
};

export function Button({ variant, text, ...props }: ButtonProps) {
  return (
    <>
      {variant === "outline" && (
        <S.ButtonOutline {...props}>
          <S.ButtonOutlineText>{text}</S.ButtonOutlineText>
        </S.ButtonOutline>
      )}
      {variant === "solid" && (
        <S.ButtonSolid {...props}>
          <S.ButtonSolidText>{text}</S.ButtonSolidText>
        </S.ButtonSolid>
      )}
    </>
  );
}
