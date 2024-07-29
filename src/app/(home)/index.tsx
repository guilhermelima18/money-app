import { useEffect, useMemo } from "react";
import { Link } from "expo-router";
import { useTransactions } from "@/hooks/use-transaction";
import { CardSummary } from "@/components/cards/card-summary";
import { Button } from "@/components/button";
import * as S from "./styles";

export default function Home() {
  const { transactions, getTransactions, createTransaction } =
    useTransactions();

  const incomingTransactions = useMemo(() => {
    let result;
    if (transactions?.length) {
      result = transactions
        .filter((transaction) => transaction.tipo === "ENTRADA")
        .reduce((prev, current) => {
          return (prev += current.valor);
        }, 0);

      return result;
    }

    return result || 0;
  }, [transactions]);

  const outgoingTransactions = useMemo(() => {
    let result;
    if (transactions?.length) {
      result = transactions
        .filter((transaction) => transaction.tipo === "SAIDA")
        .reduce((prev, current) => {
          return (prev += current.valor);
        }, 0);

      return result;
    }

    return result || 0;
  }, [transactions]);

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <S.Container>
      <S.Title>Money App</S.Title>
      <S.Text>Gerencie suas finanças aqui!</S.Text>

      <S.ContainerCards>
        <CardSummary
          type="entrada"
          typeTitle="Entradas"
          amount={incomingTransactions}
          date="23 de julho"
        />

        <CardSummary
          type="saida"
          typeTitle="Saídas"
          amount={outgoingTransactions}
          date="23 de julho"
        />
      </S.ContainerCards>

      <S.ContainerButton>
        <Link href="/transactions" asChild>
          <Button variant="solid" text="Transações" />
        </Link>
      </S.ContainerButton>
    </S.Container>
  );
}
