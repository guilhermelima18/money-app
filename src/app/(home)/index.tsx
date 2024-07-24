import { CardSummary } from "@/components/cards/card-summary";
import * as S from "./styles";
import { Button } from "@/components/button";
import { Link } from "expo-router";

export default function Home() {
  return (
    <S.Container>
      <S.Title>Money App</S.Title>
      <S.Text>Gerencie suas finanças aqui!</S.Text>

      <S.ContainerCards>
        <CardSummary
          type="entrada"
          typeTitle="Entradas"
          amount="17.500,00"
          date="23 de julho"
        />

        <CardSummary
          type="saida"
          typeTitle="Saídas"
          amount="132,00"
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
