import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTransactions } from "../context/TransactionContext";
import BalanceCard from "../components/BalanceCard";
import ActionButtons from "../components/ActionButtons";
import TransactionItem from "../components/TransactionItem";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { transactions } = useTransactions();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>Lucas 👋</Text>

        <BalanceCard />
        <ActionButtons onPress={() => navigation.navigate("Add" as never)} />

        <Text style={styles.sectionTitle}>Transações recentes</Text>

        {transactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            id={tx.id}
            emoji={tx.emoji}
            name={tx.name}
            date={tx.date}
            value={tx.value}
            type={tx.type}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f0f1a" },
  scroll: { flex: 1 },
  content: { padding: 20, paddingTop: 40 },
  greeting: { fontSize: 14, color: "#7070a0", marginBottom: 2 },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7070a0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 14,
  },
});
