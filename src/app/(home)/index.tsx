import { useEffect, useMemo, useState } from "react";
import { Money, PlusCircle } from "phosphor-react-native";
import { useTransactions } from "@/hooks/use-transaction";
import { ModalNewTransaction } from "@/components/modal/modal-new-transaction";
import { CardSummary } from "@/components/cards/card-summary";
import { Button } from "@/components/button";
import * as S from "./styles";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const { transactions, getTransactions } = useTransactions();

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

  function handleOpenOrCloseModalNewTransaction() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.LogoContainer>
          <Money size={32} />
          <S.Text>Money APP</S.Text>
        </S.LogoContainer>

        <S.ContainerButton>
          <Button
            variant="solid"
            text="Nova transação"
            icon={<PlusCircle size={24} color="white" />}
            onPress={handleOpenOrCloseModalNewTransaction}
          />
        </S.ContainerButton>
      </S.HeaderContainer>

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

      <ModalNewTransaction
        showModal={showModal}
        onClose={handleOpenOrCloseModalNewTransaction}
      />
    </S.Container>
  );
}
