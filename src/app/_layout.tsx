import { StatusBar } from "react-native";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { initializeDatabse } from "@/database/initializeDatabase";
import { Contexts } from "@/contexts";
import { Loading } from "@/components/loading";
import { theme } from "@/theme";
import * as S from "@/styles/global";

export default function Layout() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return (
      <S.ContainerLoading>
        <Loading />
      </S.ContainerLoading>
    );
  }

  return (
    <SQLiteProvider databaseName="money.db" onInit={initializeDatabse}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <S.ContainerApp>
          <Contexts>
            <Slot />
          </Contexts>
        </S.ContainerApp>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
