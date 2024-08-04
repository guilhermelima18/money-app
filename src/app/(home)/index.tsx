import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Money, PlusCircle } from "phosphor-react-native";
import { useTransaction } from "@/contexts/transaction";
import { ModalNewTransaction } from "@/components/modal/modal-new-transaction";
import { CardSummary } from "@/components/cards/card-summary";
import { Button } from "@/components/button";
import * as S from "./styles";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const { transactions, getTransactions } = useTransaction();

  console.log({ transactions });

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

  const parseDate = (dateStr: string) => {
    const [month, day, year] = dateStr.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const lastIncomingTransaction = useMemo(() => {
    let result;
    if (transactions?.length) {
      result = transactions
        .filter((transaction) => transaction.tipo === "ENTRADA")
        .reduce((latest, current) => {
          const currentDate = parseDate(current.data_criacao);
          const latestDate = parseDate(latest.data_criacao);

          return currentDate > latestDate ? current : latest;
        });

      return result;
    }
  }, [transactions]);

  const lastOutgoingTransaction = useMemo(() => {
    let result;
    if (transactions?.length) {
      result = transactions
        .filter((transaction) => transaction.tipo === "SAIDA")
        .reduce((latest, current) => {
          const currentDate = parseDate(current.data_criacao);
          const latestDate = parseDate(latest.data_criacao);

          return currentDate > latestDate ? current : latest;
        });

      return result;
    }
  }, [transactions]);

  function handleOpenOrCloseModalNewTransaction() {
    setShowModal(!showModal);
  }

  useFocusEffect(
    useCallback(() => {
      getTransactions();
    }, [])
  );

  return (
    <S.Container>
      <S.LogoContainer>
        <Money size={40} />
        <S.Title>Gerencie suas finanças!</S.Title>
      </S.LogoContainer>

      <S.ContainerCards>
        <CardSummary
          type="entrada"
          typeTitle="Entradas"
          amount={incomingTransactions}
          date={lastIncomingTransaction?.data_criacao!}
        />

        <CardSummary
          type="saida"
          typeTitle="Saídas"
          amount={outgoingTransactions}
          date={lastOutgoingTransaction?.data_criacao!}
        />
      </S.ContainerCards>

      <S.ContainerButton>
        <Button
          variant="solid"
          text="Nova transação"
          icon={<PlusCircle size={24} color="white" />}
          onPress={handleOpenOrCloseModalNewTransaction}
        />
      </S.ContainerButton>

      <ModalNewTransaction
        showModal={showModal}
        onClose={handleOpenOrCloseModalNewTransaction}
      />
    </S.Container>
  );
}
