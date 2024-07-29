import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react-native";
import { theme } from "@/theme";
import { formatCurrency } from "@/helpers/functions";
import * as S from "./styles";

type CardSummaryProps = {
  type: "entrada" | "saida";
  typeTitle: string;
  amount: number;
  date: string;
};

export function CardSummary({
  type,
  typeTitle,
  amount,
  date,
}: CardSummaryProps) {
  return (
    <S.Container>
      <S.TypeSummaryContainer>
        <S.TypeSummaryText>{typeTitle}</S.TypeSummaryText>
        {type === "entrada" ? (
          <ArrowCircleUp size={32} color={theme.COLORS.EMERALD_500} />
        ) : (
          <ArrowCircleDown size={32} color={theme.COLORS.RED_500} />
        )}
      </S.TypeSummaryContainer>

      <S.Amount>{formatCurrency(amount)}</S.Amount>
      <S.Date>Última entrada em {date}</S.Date>
    </S.Container>
  );
}
