import "@/styles/global.css";
import { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home } from "@/screens/home";
import { initializeDatabase } from "@/services/prisma";

const Stack = createNativeStackNavigator();

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
