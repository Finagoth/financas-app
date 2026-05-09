import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import AddScreen from "../screens/AddScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#16162a",
            borderTopColor: "#2a2a3a",
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: "#378ADD",
          tabBarInactiveTintColor: "#7070a0",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Início",
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>🏠</Text>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarLabel: "Adicionar",
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>➕</Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
