import { useCallback, useEffect, useState } from "react";
import { StatusBar, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { CurrencyCircleDollar, House } from "phosphor-react-native";

import { Home } from "@/screens/home";
import { Transactions } from "@/screens/transactions";

import { initializeDatabase } from "@/services/prisma";

import "@/styles/global.css";

const Tab = createBottomTabNavigator();

export default function App() {
  const [databaseInitialized, setDatabaseInitialized] = useState(false);

  const setup = useCallback(async () => {
    try {
      await initializeDatabase();
      setDatabaseInitialized(true);
    } catch (error) {
      console.log(error);
      setDatabaseInitialized(false);
    }
  }, []);

  useEffect(() => {
    setup();
  }, []);

  if (!databaseInitialized) {
    return (
      <SafeAreaView>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{ headerShown: false, tabBarActiveTintColor: "#121214" }}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{ tabBarIcon: House, title: "Início" }}
        />

        <Tab.Screen
          name="transactions"
          component={Transactions}
          options={{ tabBarIcon: CurrencyCircleDollar, title: "Transações" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
