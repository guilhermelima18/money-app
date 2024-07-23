import { StatusBar } from "react-native";
import { Slot } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
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
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.ContainerApp>
        <Slot />
      </S.ContainerApp>
    </ThemeProvider>
  );
}
