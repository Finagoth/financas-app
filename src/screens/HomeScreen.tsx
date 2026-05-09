import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import BalanceCard from "../components/BalanceCard";
import TransactionItem from "../components/TransactionItem";

type Filter = "all" | "income" | "expense";

export default function HomeScreen() {
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = transactions.filter((tx) => {
    if (filter === "all") return true;
    return tx.type === filter;
  });

  function handleFilter(type: "income" | "expense") {
    setFilter((prev) => (prev === type ? "all" : type));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.name}>Olá 👋</Text>

        <BalanceCard />

        {/* Botões que filtram a lista */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[
              styles.btn,
              styles.btnIncome,
              filter === "income" && styles.btnIncomeActive,
            ]}
            onPress={() => handleFilter("income")}
          >
            <Text style={[styles.btnText, styles.textGreen]}>+ Entrada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btn,
              styles.btnExpense,
              filter === "expense" && styles.btnExpenseActive,
            ]}
            onPress={() => handleFilter("expense")}
          >
            <Text style={[styles.btnText, styles.textRed]}>− Saída</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          {filter === "all"
            ? "Todas as transações"
            : filter === "income"
              ? "Entradas"
              : "Saídas"}
        </Text>

        {filtered.length === 0 ? (
          <Text style={styles.empty}>Nenhuma transação encontrada.</Text>
        ) : (
          filtered.map((tx) => (
            <TransactionItem
              key={tx.id}
              id={tx.id}
              emoji={tx.emoji}
              name={tx.name}
              date={tx.date}
              value={tx.value}
              type={tx.type}
            />
          ))
        )}
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
  btnRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  btnIncome: {
    backgroundColor: "#1a3d2b",
    borderColor: "#1a3d2b",
  },
  btnIncomeActive: {
    borderColor: "#5dd4a0",
    borderWidth: 2,
  },
  btnExpense: {
    backgroundColor: "#3d1a1a",
    borderColor: "#3d1a1a",
  },
  btnExpenseActive: {
    borderColor: "#f07070",
    borderWidth: 2,
  },
  btnText: { fontSize: 14, fontWeight: "600" },
  textGreen: { color: "#5dd4a0" },
  textRed: { color: "#f07070" },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7070a0",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  empty: {
    fontSize: 13,
    color: "#7070a0",
    textAlign: "center",
    marginTop: 24,
  },
});
