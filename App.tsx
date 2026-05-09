import { View, ActivityIndicator } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { TransactionProvider } from "./src/context/TransactionContext";
import { useTransactions } from "./src/context/TransactionContext";

function Root() {
  const { isLoading } = useTransactions();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0f0f1a",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#378ADD" />
      </View>
    );
  }

  return <AppNavigator />;
}

export default function App() {
  return (
    <TransactionProvider>
      <Root />
    </TransactionProvider>
  );
}
